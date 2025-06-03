CREATE TABLE articles (
  id INT PRIMARY KEY,
  title TEXT
);

CREATE TABLE clauses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INT NOT NULL,
  text TEXT NOT NULL,
  embedding VECTOR(768),
  article_id INT NOT NULL REFERENCES articles (id) ON DELETE CASCADE
);
