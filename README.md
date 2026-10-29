# ISCTE Workers workshop: student template

Your own page on the internet, running on Cloudflare Workers. Plain JavaScript, no frameworks.

## Deploy it

Click the button. Cloudflare copies this template into a new repo on your GitHub, deploys it,
and redeploys it on every `git push`.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/RoderickOxen/iscte-workers-template)

You'll need a free Cloudflare account, a GitHub account and a NASA API key (https://api.nasa.gov).

## Then follow the Lab Guide

**https://arena.cf2026iscte.nobledemos.com/lab**

## Run it locally

```sh
npm install
cp .dev.vars.example .dev.vars    # then paste your NASA key into .dev.vars
npm run dev
```

Open http://localhost:8787.

## What's inside

```
wrangler.jsonc    config: name, entry point, vars, bindings
src/index.js      the Worker: routes for /, /api/card and /api/chat
src/page.js       builds the HTML for your page
src/apod.js       NASA picture of the day (Mission 2)
src/droid.js      your Star Wars droid (Mission 3)
public/           static files (CSS, images)
AGENTS.md         a short brief for coding agents
```
