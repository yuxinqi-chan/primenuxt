import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const { key } = await getYupRouterParams(
    event,
    yup.object({ key: yup.string().required() }),
    { decode: true },
  );
  const media = useStorage<R2ObjectBody>("media");
  const ifNoneMatch = getRequestHeader(event, "If-None-Match");
  const head = await media.getMeta(key);
  if (!head) {
    setResponseStatus(event, 404);
    return;
  }
  const etag = head.httpEtag;
  if (ifNoneMatch && ifNoneMatch === etag) {
    setResponseStatus(event, 304);
    return;
  }
  const item = await media.getItemRaw<ArrayBuffer>(key);
  if (!item) {
    setResponseStatus(event, 404);
    return;
  }
  setHeader(event, "ETag", etag);
  if (
    head.httpMetadata &&
    typeof head.httpMetadata === "object" &&
    "contentType" in head.httpMetadata &&
    typeof head.httpMetadata.contentType === "string"
  ) {
    return new Blob([item], { type: head.httpMetadata.contentType });
  }
  return new Blob([item]);
});
