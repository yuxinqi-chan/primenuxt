export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const config = useRuntimeConfig(event);
  updateSiteConfig(event, {
    name: config.public.siteName,
    indexable: false,
    url: url.origin,
  });
});
