// SOLUTION for Phase 2. Teacher's reference: copy over src/droid.js.
import { getCharacter } from "./character.js";
import { buildSystemPrompt } from "./prompt.js";

// Mission 3a: describe how your droid talks (every student writes their own)
const TONE = "Talk like a cheerful pirate captain. Use sea slang and end with 'Arr!'.";

// A small, cheap Workers AI chat model. It runs on your own free account through env.AI.
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

const MAX_ANSWER = 280;
const FALLBACK = "Beep boop! My circuits are tangled, but the Force is with us. Ask me again!";

// Cut to 280 characters, ending with an ellipsis if we had to cut.
function limit(text) {
  const clean = String(text ?? "").trim();
  return clean.length <= MAX_ANSWER ? clean : `${clean.slice(0, MAX_ANSWER - 1).trimEnd()}…`;
}

// The Hub gives up after 8 s, so stop waiting for the model after 6.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("AI timeout")), ms)),
  ]);
}

export async function handleChat(request, env) {
  let question = "";
  try {
    const body = await request.json();
    question = String(body?.question ?? "").trim();
  } catch {
    return Response.json({ error: "Send JSON: { round, question }" }, { status: 400 });
  }
  if (!question) return Response.json({ error: "Missing question" }, { status: 400 });

  try {
    const character = await getCharacter(env.CHARACTER_ID);
    const messages = [
      { role: "system", content: buildSystemPrompt({ character, tone: TONE }) },
      { role: "user", content: question },
    ];
    const result = await withTimeout(env.AI.run(MODEL, { messages, max_tokens: 120 }), 6000);
    const answer = limit(result?.response);
    return Response.json({ answer: answer || FALLBACK });
  } catch (err) {
    console.log("Droid failed:", err.message);
    return Response.json({ answer: FALLBACK });
  }
}
