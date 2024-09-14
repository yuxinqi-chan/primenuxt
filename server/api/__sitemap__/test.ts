export default defineEventHandler(async (event) => {
  try {
    const res = await $fetch("/api/__sitemap__/urls");
    return res;
  } catch (error) {
    return error;
  }
});
