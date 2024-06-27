from elasticsearch import Elasticsearch as es
import logging
import os
import pandas as pd
from sklearn.model_selection import train_test_split
import sqlalchemy as db
from sqlalchemy.orm import scoped_session, sessionmaker
from surprise import Dataset, Reader
from surprise.prediction_algorithms.matrix_factorization import SVD
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed
import urllib3 


urllib3.disable_warnings()

POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_SERVER = os.environ.get('POSTGRES_SERVER')
POSTGRES_DB = 'app'

ELASTIC_API_KEY = os.environ.get('ELASTIC_API_KEY')
ES_PORT = os.environ.get('ES_PORT')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 30 # half a minute
wait_secs = 1

# Crear una conexión a la base de datos
engine = db.create_engine(f'postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}')

Session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_secs),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def create_user_recommendations(n_recommendations=5):
    
    with Session() as session:
        comments_df = pd.read_sql_query('SELECT id_city, id_user, rating FROM "comment"', session.connection())
        tags_df = pd.read_sql_query('SELECT t.id, t.name FROM user_tag ut JOIN tag t ON ut.id = t.id;', session.connection())
        tags_assignation_df = pd.read_sql_query('SELECT id_user, id_user_tag FROM assign_user', session.connection())
        session.close()
        
    # Merge tags_assignation_df con tags_df para obtener los nombres de las etiquetas
    tags_assignation_df = tags_assignation_df.merge(tags_df, left_on='id_user_tag', right_on='id')
    
    # Pivotar la tabla tags_assignation_df
    pivot_df = tags_assignation_df.pivot_table(index='id_user', columns='name', aggfunc='size', fill_value=0)
    
    # Convertir los valores pivotados a enteros (1 o 0)
    pivot_df = (pivot_df > 0).astype(int).reset_index()
    
    # Merge comments_df con pivot_df para obtener el formato deseado
    final_df = comments_df.merge(pivot_df, left_on='id_user', right_on='id_user', how='left')
    
    # Asegurarse de que todas las columnas de etiquetas sean enteros y reemplazar NaN con 0
    final_df = final_df.fillna(0).astype({col: int for col in pivot_df.columns if col != 'id_user'})
    
    # Crear un conjunto de entrenamiento y prueba
    train_df, test_df = train_test_split(final_df, test_size=0.2)
    
    # Crear un lector de Surprise
    reader = Reader(rating_scale=(1, 5))
    
    # Crear un conjunto de datos de Surprise
    train_data = Dataset.load_from_df(train_df[['id_user', 'id_city', 'rating']], reader)
    trainset = train_data.build_full_trainset()
    
    # Entrenar un modelo SVD
    model = SVD()
    model.fit(train_data.build_full_trainset())
    
    model.test(trainset.build_anti_testset())
    
    # Crear una lista de recomendaciones
    recommendations = []
    
    # Para cada uno de los usuarios del sistema que tengan al menos una recomendación
    for id_user in final_df['id_user'].unique():
        user_cities = final_df[final_df['id_user'] == id_user]['id_city'].unique()
        all_cities = final_df['id_city'].unique() 
        cities_to_predict = list(set(all_cities) - set(user_cities))
        user_city_pairs = [(id_user, id_city, 0) for id_city in cities_to_predict]
        predictions_cf = model.test(user_city_pairs)
        top_n_recommendations = sorted(predictions_cf, key=lambda x: x.est, reverse=True)[:n_recommendations]
        top_n_cities_ids = [int(pred.iid) for pred in top_n_recommendations]
        for city_id in top_n_cities_ids:
            recommendations.append({
                'id_user': int(id_user),
                'id_city': int(city_id),
            })
    
    # Insertar las recomendaciones en la base de datos
    with Session() as session:
        # Eliminamos las recomendaciones anteriores
        session.execute(db.text('''DELETE FROM user_suggested'''))
        sql = db.text('''INSERT INTO user_suggested (id_user, id_city) VALUES (:id_user, :id_city)''')
        session.execute(sql, recommendations)
        session.commit()
        session.close()


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_secs),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def create_city_recommendations():
    client = es(
        f'https://es01:{ES_PORT}/',
        api_key=ELASTIC_API_KEY,
        verify_certs=False
    )
    
    if not client.indices.exists(index='cities_recommendation'):
        client.indices.create(index='cities_recommendation')
        
    with Session() as session:
        sql = db.text('''
            SELECT c.id as city_id, t.name as tag_name, ac.count
            FROM city c
            JOIN assign_city ac ON c.id = ac.id_city
            JOIN city_tag ct ON ac.id_city_tag = ct.id
            JOIN tag t ON ct.id = t.id;
        ''')        
        results = session.execute(sql)
        session.close()
        
    city_tags = {}
    for row in results:
        city_id, tag_name, count = row
        if city_id not in city_tags:
            city_tags[city_id] = []
        city_tags[city_id].extend([tag_name] * count)


    cities = []
    for city_id, tags in city_tags.items():
        tags_text = " ".join(tags)
        cities.append((city_id, tags_text))
        client.index(index='cities_recommendation', id=city_id, body={'tags': tags_text})
        
    recommendations = [] 
        
    for city_id, tags in cities:
        search_query = {
            'query': {
                'match': {
                    'tags': tags
                }
            },
            "_source": False,  # No necesitas recuperar el contenido del documento, solo los IDs
            "sort": [
                {"_score": {"order": "desc"}}  # Ordenar por score de manera descendente
            ]
        }
        
        es_results = client.search(index='cities_recommendation', body=search_query)
        
        filtered_results = es_results['hits']['hits'][1:6]
        
        for recommended_city_id in filtered_results:
            recommendations.append({
                'id_city': int(city_id),
                'id_suggestion': recommended_city_id['_id']
            })
            
    with Session() as session:
        session.execute(db.text('''DELETE FROM city_suggested'''))
        sql = db.text('''INSERT INTO city_suggested (id_city, id_suggestion) VALUES (:id_city, :id_suggestion)''')
        session.execute(sql, recommendations)
        session.commit()
        session.close()
            
        

if __name__ == '__main__':
    logger.info("Creating user recommendations")
    create_user_recommendations()   
    logger.info("User recommendations created")
    logger.info("Creating city recommendations")
    create_city_recommendations()
    logger.info("City recommendations created")
    logger.info("All recommendations created")
    logger.info("Scheduled task finished")
    print("Scheduled task finished")