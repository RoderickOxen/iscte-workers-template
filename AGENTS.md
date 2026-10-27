# Student Worker

A Cloudflare Worker in plain JavaScript (no TypeScript, no frameworks). It serves a personal
page (`/`), a card (`GET /api/card`) and a Star Wars droid (`POST /api/chat`) that the class Hub calls.

## Files
- `src/droid.js`: the droid. `handleChat(request, env)` is where droid work happens.
- `src/page.js`, `public/style.css`: the page. Page features go here.
- `src/apod.js`, `src/swapi.js`, `src/labels.js`, `src/prompt.js`: working helpers. Use them; don't rewrite them.
- `src/index.js`: router. Don't change it unless asked.

## Contract (never break)
- `GET /api/card` → `{ name, tagline, emoji, characterId }`
- `POST /api/chat` with `{ round, question }` → `{ answer }` (max 280 chars) within 8 s.

## Rules
- Never change `TONE` in `src/droid.js`: the student writes it.
- Never read, print or commit `.dev.vars`. It holds secrets.
- Never change `"name"` in `wrangler.jsonc`.
- Never run `wrangler deploy`. Production deploys happen through `git push` (Workers Builds).
- Only commit and push when the student asks.
- Keep changes small and show the diff.

## Test
`npm run dev`, then:
curl -X POST http://localhost:8787/api/chat -H "content-type: application/json" -d '{"round":"intro","question":"Introduce yourself."}'
