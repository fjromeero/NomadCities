from app.db.engine import Session

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()