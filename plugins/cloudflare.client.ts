export default defineNuxtPlugin(async () => {
  const { data } = await useFetch("/api/cloudflare", {});
  return {
    provide: {
      cf: data.value,
    },
  };
});
