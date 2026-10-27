// What getApod returns. page.js and droid.js use these fields.
// { title, explanation, imageUrl, copyright }
const PLACEHOLDER = {
  title: "A placeholder sky",
  explanation: "This is a placeholder picture. Finish Mission 2 to see NASA's picture for your date.",
  imageUrl: "/placeholder.jpg",
  copyright: undefined,
};

export async function getApod(date, env) {
  // Mission 2: fetch the real picture from NASA
  return PLACEHOLDER;
}
