export default defineNuxtPlugin(() => {
  const event = useRequestEvent();
  const ip = event?.headers.get("CF-Connecting-IP");
  return {
    provide: {
      cf: { ...event?.context.cf, ip },
    },
  };
});
