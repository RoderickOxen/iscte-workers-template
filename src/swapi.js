// Looks up a Star Wars character. Never throws: on any failure it returns a generic stranger.
//
// Returns { name, birthYear, homeworld, films }
//   homeworld: planet name or null
//   films:     up to 3 film titles
//
// Tries swapi.dev first and falls back to swapi.info. Every request is cached at the edge for
// 24 hours (the data never changes), so most calls don't leave Cloudflare.

const SOURCES = [
  (id) => `https://swapi.dev/api/people/${id}/`,
  (id) => `https://swapi.info/api/people/${id}`,
];

const CACHE = { cf: { cacheTtl: 86400, cacheEverything: true } };
const MAX_FILMS = 3;

const STRANGER = {
  name: "a mysterious stranger",
  birthYear: null,
  homeworld: null,
  films: [],
};

async function getJson(url) {
  try {
    const res = await fetch(url, { ...CACHE, signal: AbortSignal.timeout(2500) });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.log("SWAPI request failed:", url, err.message);
    return null;
  }
}

// Only follow links to the SWAPI hosts, in case the data ever contains something else.
function isSwapiUrl(value) {
  try {
    const { protocol, hostname } = new URL(value);
    return protocol === "https:" && (hostname === "swapi.dev" || hostname === "swapi.info");
  } catch {
    return false;
  }
}

async function nameOf(url, field) {
  if (!isSwapiUrl(url)) return null;
  const data = await getJson(url);
  return data?.[field] ?? null;
}

export async function getCharacter(id) {
  try {
    const safeId = encodeURIComponent(String(id ?? "").trim());
    if (!safeId) return STRANGER;

    let person = null;
    for (const source of SOURCES) {
      const data = await getJson(source(safeId));
      if (data?.name) {
        person = data;
        break;
      }
    }
    if (!person) return STRANGER;

    const filmUrls = Array.isArray(person.films) ? person.films.slice(0, MAX_FILMS) : [];
    const [homeworld, ...films] = await Promise.all([
      person.homeworld ? nameOf(person.homeworld, "name") : null,
      ...filmUrls.map((url) => nameOf(url, "title")),
    ]);

    return {
      name: person.name,
      birthYear: person.birth_year && person.birth_year !== "unknown" ? person.birth_year : null,
      homeworld,
      films: films.filter(Boolean),
    };
  } catch (err) {
    console.log("getCharacter failed:", err.message);
    return STRANGER;
  }
}
