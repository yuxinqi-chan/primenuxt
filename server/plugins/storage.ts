import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const storage = useStorage();
    const driver = cloudflareKVBindingDriver({
      binding: event.context.cloudflare.env.KV,
    });
    storage.mount("kv", driver);
  });
});
