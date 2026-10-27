import { renderPage } from "./page.js";
import { getApod } from "./apod.js";
import { handleChat } from "./droid.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/card") return Response.json(card(env));
    if (url.pathname === "/api/chat" && request.method === "POST") return handleChat(request, env);
    if (url.pathname === "/") return renderHome(request, env);

    return new Response("Not found", { status: 404 });
  },
};

function card(env) {
  return {
    name: env.NAME,
    tagline: env.TAGLINE,
    emoji: env.EMOJI,
    characterId: env.CHARACTER_ID,
  };
}

async function renderHome(request, env) {
  const apod = await getApod(env.APOD_DATE, env);
  const colo = request.cf?.colo || "your nearest data centre";
  return new Response(renderPage(env, apod, colo), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
