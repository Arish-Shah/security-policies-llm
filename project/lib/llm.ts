import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { z } from "zod";

const llm = new ChatOllama({
  model: "llama3.2",
});

// const llm = new ChatOpenAI({
//   model: "gpt-4o-mini",
// });

export async function getSplits(file: File) {
  const loader = new PDFLoader(file);
  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent);
}

export async function getProjectTitle(content: string) {
  const schema = z.object({
    title: z.string().describe("Title of the document"),
  });

  const llmWithSo = llm.withStructuredOutput(schema, { name: "get_title" });

  const result = await llmWithSo.invoke(
    `Return possible title in 3-4 words: ${content}`
  );
  return result.title;
}

export async function getRules(contents: string[]) {
  const schema = z.object({
    rules: z
      .array(z.string().describe("Rule in the document"))
      .describe("Rules in the document"),
  });

  const extractedRules: string[] = [];
  let endRule = "";

  const llmWithSO = llm.withStructuredOutput(schema, { name: "get_rules" });

  for (const content of contents.slice(0, 3)) {
    const result = await llmWithSO.invoke(`
      Extract complete in original text, don't summarise or shorten:

      ${content}
    `);

    const rules = result.rules;

    if (rules.length >= 2) {
      endRule = rules[rules.length - 1];
      extractedRules.push(...result.rules.slice(0, rules.length - 2));
    } else {
      endRule = "";
      extractedRules.push(...result.rules);
    }
  }

  return extractedRules;
}
