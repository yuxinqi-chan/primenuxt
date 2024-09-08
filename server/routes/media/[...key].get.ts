import * as yup from "yup";

export default defineEventHandler(async (event) => {
  console.log(import.meta.dev);
  const { key } = await getYupRouterParams(
    event,
    yup.object({ key: yup.string().required() }),
    { decode: true },
  );
  const ifNoneMatch = getRequestHeader(event, "If-None-Match");
  const head = await event.context.mediaBucket.head(key);
  if (!head) {
    setResponseStatus(event, 404);
    return;
  }
  const etag = head.httpEtag;
  if (ifNoneMatch && ifNoneMatch === etag) {
    setResponseStatus(event, 304);
    return;
  }
  const obj = await event.context.mediaBucket.get(key);
  if (!obj) {
    setResponseStatus(event, 404);
    return;
  }
  setHeader(event, "ETag", etag);
  return obj.blob();
});
