from pgvector.psycopg import register_vector
import psycopg

from config import DB_URL
from models import Article, Clause, Dependencies
from llm import get_embedding

conn = psycopg.connect(DB_URL, autocommit=True)
cur = conn.cursor()
register_vector(conn)

def add_article(article: Article):
    cur.execute(
        "INSERT INTO articles (id, title) VALUES (%s, %s)",
        (article.number, article.title)
    )
    for clause in article.clauses:
        add_clause(article.number, clause)

def add_clause(article_number: int, clause: Clause):
    embedding = get_embedding(clause.text)

    cur.execute("""
        INSERT INTO clauses (number, text, embedding, article_id) VALUES (%s, %s, %s, %s)
    """, (clause.number, clause.text, embedding, article_number))

def search(query: str) -> list[tuple[int, int, str]]:
    embedding = get_embedding(query)
    cur.execute("""
            SELECT article_id, number, text
            FROM clauses
            ORDER BY embedding <=> CAST(%s as VECTOR) LIMIT 3
        """, (embedding, ))
    return cur.fetchall()

def find_clauses(dependencies: Dependencies):
    inputs = map(lambda x: (x.article, x.clause), dependencies.dependencies)
    results = []
    for input in inputs:
        row = cur.execute("SELECT text FROM clauses WHERE article_id = %s AND number = %s", input).fetchone()
        if row:
            results.append((*input, row[0]))
    return results

# check chatgpt policies and check if they comply to gdpr regulations
# translation to rego for open policy agent
# check open source projects that comply with security policies and use them
