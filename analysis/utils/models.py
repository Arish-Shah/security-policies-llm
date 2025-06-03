from pydantic import BaseModel
from typing import List, Tuple

# PDF extraction
class Clause(BaseModel):
    number: int
    text: str

class Article(BaseModel):
    number: int
    title: str
    clauses: List[Clause]

class Policies(BaseModel):
    articles: List[Article]

# Article dependencies
class Dependency(BaseModel):
    article: int
    clause: int

class Dependencies(BaseModel):
    dependencies: List[Dependency]


# Workflow
class Workflow(BaseModel):
    title: str
    steps: List[str]

class Workflows(BaseModel):
    workflows: List[Workflow]
