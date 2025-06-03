import pickle
from models import Policies

def write_to_temp(filepath: str, contents: Policies):
    with open(filepath, "wb") as f:
        pickle.dump(contents, f)

def read_from_temp(filepath: str) -> Policies:
    with open(filepath, "rb") as f:
        contents = pickle.load(f)
    return contents
