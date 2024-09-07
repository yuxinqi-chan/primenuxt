import cloudflareR2BindingDriver from "unstorage/drivers/cloudflare-r2-binding";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const storage = useStorage();
    const driver = cloudflareR2BindingDriver({
      binding: event.context.cloudflare.env.MEDIA_BUCKET,
    });
    storage.mount("media", driver);
  });
});
