import random
import string

def random_string(k: int = 32) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=k))

def random_email() -> str:
    return f"{random_string(20)}@{random_string(5)}.com"