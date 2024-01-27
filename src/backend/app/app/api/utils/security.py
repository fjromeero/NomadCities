from passlib.hash import bcrypt

def hash_password(password) -> str:
    return bcrypt.hash(password)