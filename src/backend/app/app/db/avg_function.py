from alembic_utils import pg_function, pg_trigger

func_update_avg_ratings = pg_function.PGFunction(
    schema="public",
    signature="func_update_avg_ratings()",
    definition="""
RETURNS TRIGGER AS $$
BEGIN
    UPDATE city
    SET 
        avg_rating = (SELECT AVG(rating) FROM comment WHERE city.id = NEW.id_city),
        avg_price_per_month = (SELECT AVG(price_per_month) FROM comment WHERE city.id = NEW.id_city),
        avg_internet_connection = (SELECT AVG(internet_connection) FROM comment WHERE city.id = NEW.id_city),
        avg_coworking_spaces = (SELECT AVG(coworking_spaces) FROM comment WHERE city.id = NEW.id_city),
        avg_health_service = (SELECT AVG(health_service) FROM comment WHERE city.id = NEW.id_city),
        avg_safety = (SELECT AVG(safety) FROM comment WHERE city.id = NEW.id_city),
        avg_gastronomy = (SELECT AVG(gastronomy) FROM comment WHERE city.id = NEW.id_city),
        avg_means_of_transport = (SELECT AVG(means_of_transport) FROM comment WHERE city.id = NEW.id_city),
        avg_foreign_friendly = (SELECT AVG(foreign_friendly) FROM comment WHERE city.id = NEW.id_city)
    WHERE id = NEW.id_city;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
"""
)

compute_avg_ratings = pg_trigger.PGTrigger(
    schema="public",
    signature="compute_avg_ratings",
    on_entity="comment",
    is_constraint=False,
    definition="""AFTER INSERT ON comment
        FOR EACH ROW
        EXECUTE FUNCTION func_update_avg_ratings()""",
)