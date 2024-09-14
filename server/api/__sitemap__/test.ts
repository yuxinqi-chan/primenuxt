export default defineEventHandler(async (event) => {
  try {
    const res = await event.$fetch("/api/__sitemap__/urls");
    return res;
  } catch (error) {
    return JSON.stringify(error);
  }
});
