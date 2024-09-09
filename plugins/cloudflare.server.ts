import { useRequestEvent } from "#imports";

export default defineNuxtPlugin(() => {
  const event = useRequestEvent();

  return {
    provide: {
      ...event?.context.cloudflare.env,
    },
  };
});
