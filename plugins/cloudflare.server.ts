import { useRequestEvent } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent();
  return {
    provide: {
      ...event?.context.cloudflare.env,
    },
  };
});
