// Asks the class Hub to label your picture with Clef, Cloudflare's picture model.
//
// Clef is a decision model: it gets a picture plus questions with fixed options and scores each
// option. It only accepts embedded images, so the Hub downloads and encodes the picture for us.
//
// Request:  POST ${HUB_URL}/v1/clef
//           authorization: Bearer ${CLASS_KEY}
//           { imageUrl, questions: [{ id, question, options: [...] }, ...] }
//
// Response: { kind, mood, color }
//           The most likely option for each question, as plain strings, e.g.
//           { "kind": "nebula", "mood": "dramatic", "color": "Vivid" }
//           (also accepted: the same object wrapped as { labels: { ... } })
//
// Returns { kind, mood, color }, or null when anything is missing or fails.
// The droid works without labels, so this never throws.

const QUESTIONS = [
  {
    id: "kind",
    question: "What is the main subject of this picture?",
    options: ["galaxy", "nebula", "planet", "star", "earth", "sun", "moon", "spacecraft", "other"],
  },
  {
    id: "mood",
    question: "What mood does this picture have?",
    options: ["calm", "dramatic", "mysterious", "playful"],
  },
  {
    id: "color",
    question: "How colourful is this picture?",
    options: ["Monochrome", "Muted", "Colorful", "Vivid", "Explosive"],
  },
];

export async function getPictureLabels(imageUrl, env) {
  if (!env.CLASS_KEY || !env.HUB_URL || env.HUB_URL.includes("<your-domain>")) return null;
  // Relative URLs (the placeholder) can't be fetched by the Hub.
  if (!/^https?:\/\//i.test(imageUrl || "")) return null;

  try {
    const res = await fetch(`${env.HUB_URL}/v1/clef`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.CLASS_KEY}`,
      },
      body: JSON.stringify({ imageUrl, questions: QUESTIONS }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      console.log("Clef labels failed:", res.status);
      return null;
    }

    const data = await res.json();
    const labels = data.labels ?? data;
    if (!labels.kind || !labels.mood || !labels.color) return null;
    return { kind: String(labels.kind), mood: String(labels.mood), color: String(labels.color) };
  } catch (err) {
    console.log("Clef labels failed:", err.message);
    return null;
  }
}
