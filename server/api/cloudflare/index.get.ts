export default defineEventHandler(async (event) => {
  const ip = event.headers.get("CF-Connecting-IP");
  return { ...event.context.cf, ip };
});
