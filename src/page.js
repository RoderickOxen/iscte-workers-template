// Builds the HTML for your page. Everything that comes from env or from NASA is escaped.

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderPage(env, apod, colo) {
  const name = esc(env.NAME);
  const tagline = esc(env.TAGLINE);
  const emoji = esc(env.EMOJI);
  const title = esc(apod.title);
  const credit = apod.copyright ? ` · &copy; ${esc(String(apod.copyright).trim())}` : "";
  // Quote and escape the URL so it is safe inside CSS url("...") and an HTML attribute.
  const imageUrl = esc(String(apod.imageUrl).replace(/["\\\n\r]/g, ""));

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${name}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body style="background-image: url(&quot;${imageUrl}&quot;)">
  <main>
    <h1>${name} <span class="emoji">${emoji}</span></h1>
    <p class="tagline">${tagline}</p>
  </main>
  <footer>
    <p class="apod">${title}${credit}</p>
    <p>Served from ${esc(colo)} · Region: Earth</p>
  </footer>
</body>
</html>`;
}
