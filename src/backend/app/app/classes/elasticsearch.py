from elasticsearch import AsyncElasticsearch as es
from app.core.settings import settings


class ElasticSearch:

    port = settings.ES_PORT

    api_key = settings.ELASTIC_API_KEY

    client = es(
        f'https://es01:{port}/',
        api_key=api_key,
        verify_certs=False
    )

    @classmethod
    async def shutdown(cls):
        await cls.client.close()


    @classmethod
    async def create_index(cls, index_name: str, analiser: dict = None):
        if not await cls.client.indices.exists(index=index_name):
            await cls.client.indices.create(index=index_name, body=analiser)
        await cls.shutdown()


    @classmethod
    async def add_document(cls, index_name: str, id: int, document: dict):
        if not await cls.client.indices.exists(index=index_name):
            return None
        await cls.client.index(index=index_name, id=id, document=document)
        await cls.shutdown()
        return id
        

    @classmethod
    async def search(cls, index_name: str, field: str, query_value: str):
        search_body = {
            "query": {
                "match": {
                    field: query_value
                }
            },
            "_source": False,  # No necesitas recuperar el contenido del documento, solo los IDs
            "sort": [
                {"_score": {"order": "desc"}}  # Ordenar por score de manera descendente
            ]
        }

        search_results = await cls.client.search(index=index_name, body=search_body)
        
        # Extraer solo los IDs de los resultados
        ids = [hit['_id'] for hit in search_results['hits']['hits']]
        
        await cls.shutdown()
        
        return ids


    @classmethod
    async def update_document(cls, index_name: str, id: int, document: dict):
        update = await cls.client.update(index=index_name, id=id, doc=document)
        await cls.shutdown()
        return update 
