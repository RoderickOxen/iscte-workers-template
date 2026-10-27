import { getApod } from "./apod.js";
import { getCharacter } from "./swapi.js";
import { getPictureLabels } from "./labels.js";
import { buildSystemPrompt } from "./prompt.js";

// Mission 3a: describe how your droid talks (write this yourself)
const TONE = "(your tone here)";

// A small, cheap Workers AI chat model. It runs on your own free account through env.AI.
const MODEL = "@cf/zai-org/glm-4.7-flash";

// Your droid. The Hub calls POST /api/chat with { round, question } and expects
// { answer } (max 280 characters) within 8 seconds. See AGENTS.md for the full contract.
export async function handleChat(request, env) {
  return Response.json({ answer: "Not built yet: ask your agent to build handleChat" });
}
