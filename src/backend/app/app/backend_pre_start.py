import logging
from sqlalchemy.orm import Session
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.db.engine import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5 # 5 minutes
wait_secs = 1

@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_secs),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init() -> None:
    try:
        with Session(engine) as session:
            session.execute("SELECT 1")
    except Exception as e:
        logger.error(e)
        raise e
    
def main() -> None:
    logger.info("Initializing service")
    init()
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()