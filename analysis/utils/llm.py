from openai import OpenAI
from config import API_KEY
from models import Dependencies, Policies, Workflow

client = OpenAI(
    api_key=API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

extraction_prompt = """
You are provided with text extracted from a security policy document.
This text contains various articles, each with a title and clauses.

Your task is to extract the:
- article number
- article title
- clauses in the article including all it's points
If an article 5 has 3 clauses (1, 2, and  3) and 3rd one has 4 points (a, b, c, and d), include all the points as a part of the clause.

PDF formatting issues such as breaks and additional spaces in words, or empty lines can be removed.
"""

dependency_prompt = """
This text is from an article from security policies that has dependencies on other articles.

Your task is to extract the:
- article and clause number
They exist in the format "Article 5(1)" in which case article is 5 and clause is 1. Individual points are considered as a whole clause.
"""

workflow_prompt = """
You are provided with various articles from a security policy document.
There is a primary article which has dependencies on other articles.
Your task is to generate **software workflows** for the primary article.

- The workflow should not refer to other articles, remove their reference and replace the information from other articles directly.
- For example, if the description says "Obtain the information provided by user as per 8(2)" and 8(2) says "in a day", the workflow should describe "Authentication in 24 hours".
"""

def get_policies(content: str):
    response = client.beta.chat.completions.parse(
        model="gemini-2.5-flash-preview-05-20",
        temperature=0.25,
        messages=[
            {"role": "system", "content": extraction_prompt},
            {"role": "user", "content": content}
        ],
        response_format=Policies
    )
    return response.choices[0].message.parsed

def get_embedding(input: str):
    response = client.embeddings.create(
        input=input,
        model="text-embedding-004"
    )
    return response.data[0].embedding

def get_dependencies(content: str):
    response = client.beta.chat.completions.parse(
        model="gemini-2.5-flash-preview-05-20",
        temperature=0.25,
        messages=[
            {"role": "system", "content": dependency_prompt},
            {"role": "user", "content": content}
        ],
        response_format=Dependencies
    )
    return response.choices[0].message.parsed

def get_workflows(content: str):
    response = client.beta.chat.completions.parse(
        model="gemini-2.5-flash-preview-05-20",
        temperature=0.25,
        messages=[
            {"role": "system", "content": workflow_prompt},
            {"role": "user", "content": content}
        ],
        response_format=Workflow
    )
    return response.choices[0].message.parsed


# help me develop workflow in python and open policy agent
# categorize articles in tags (data privacy, t&c, user rights, data provider, processor)

# in gdpr, find all the classifications

# are software workflows originating from this article
# how many articles lead to this requirement

# provider/who is being provided (subject/) classification in an article
