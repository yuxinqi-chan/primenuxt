export default defineEventHandler(async (event) => {
  event.context.mediaBucket = event.context.cloudflare.env.MEDIA_BUCKET;
});

declare module "h3" {
  interface H3EventContext {
    mediaBucket: R2Bucket;
  }
}
