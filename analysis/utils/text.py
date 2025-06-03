def create_workflow_input(clauses: list[tuple[int, int, str]]):
    primary = clauses[0]
    dependencies = clauses[1:]

    text = f"""
# Primary Article:
Article {primary[0]}({primary[1]}). {primary[2]}

# Dependencies:
"""
    return text + "\n\n".join(map(lambda x: f"Article {x[0]}({x[1]}). {x[2]}", dependencies))
