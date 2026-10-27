// Builds the system prompt for the droid from the character, the picture and its labels.
// `tone` is written by the student in src/droid.js.
export function buildSystemPrompt({ character, apod, labels, tone }) {
  const facts = [];
  if (character.homeworld) facts.push(`homeworld: ${character.homeworld}`);
  if (character.birthYear) facts.push(`born: ${character.birthYear}`);
  if (character.films?.length) facts.push(`appears in: ${character.films.join(", ")}`);

  let picture = `"${apod.title}"`;
  if (labels) {
    picture = `a ${labels.mood} picture of a ${labels.kind} (${labels.color} colours), titled ${picture}`;
  }

  return [
    `You are a protocol droid doing its best impression of ${character.name}.` +
      (facts.length ? ` Facts about ${character.name}: ${facts.join("; ")}.` : ""),
    `You are the guardian of ${picture}.` +
      (apod.explanation ? ` About it: ${String(apod.explanation).slice(0, 300)}` : ""),
    "Answer in under 280 characters. Reply with the answer only.",
    tone,
  ].join("\n\n");
}
