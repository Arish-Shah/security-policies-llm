import { OllamaEmbeddings } from "@langchain/ollama";
import { QdrantVectorStore } from "@langchain/qdrant";
import { env } from "./env";

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
});

export async function addVectors(collectionName: string, contents: string[]) {
  await QdrantVectorStore.fromTexts(contents, {}, embeddings, {
    url: env.QDRANT_URL,
    collectionName,
  });
}

export async function getResults(collectionName: string, search: string) {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    { url: env.QDRANT_URL, collectionName }
  );
  vectorStore.client.getCollection("");
  const results = await vectorStore.similaritySearch(search, 10);
  return results.map((result) => ({ rule: result.pageContent }));
}
