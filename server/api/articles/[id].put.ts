import * as yup from "yup";
import mime from "mime";

export default defineEventHandler(async (event) => {
  const { id } = await getYupRouterParams(
    event,
    yup.object({ id: yup.number().integer().positive().required() }),
  );
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const multiPartDatas = await readMultipartFormData(event);
  if (!multiPartDatas) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  const formData: Record<string, string> = {};
  for (const part of multiPartDatas) {
    if (part.name && !part.type) {
      formData[part.name] = part.data.toString();
    }
  }
  const { tags, ...articleFields } = await yup
    .object({
      title: yup.string().min(1).max(100).required(),
      image: yup.string().url().optional(),
      content: yup.string().min(1).required(),
      published: yup.boolean().required(),
      tags: yup
        .array(
          yup.object({
            id: yup.number().integer().positive().required(),
            name: yup.string().min(1).max(100).required(),
          }),
        )
        .json(),
    })
    .noUnknown()
    .validate(formData);

  for (const part of multiPartDatas) {
    if (part.filename && part.type && part.name) {
      const md5 = await bufferDigest(part.data);
      const key = `${md5}.${mime.getExtension(part.type)}`;
      await event.context.mediaBucket.put(
        key,
        new File([part.data], part.filename, { type: part.type }),
        // {
        //   httpMetadata: {
        //     contentType: part.type,
        //   },
        // },
      );
      articleFields.content = articleFields.content.replace(
        part.name,
        `${event.context.cloudflare.env.MEDIA_BUCKET_PUBLIC_URL || "/media"}/${key}`,
      );
    }
  }
  const prisma = usePrisma(event);
  const article = await prisma.article.upsert({
    where: {
      id,
    },
    create: articleFields,
    update: {
      ...articleFields,
      tags: {
        set: [],
        connect: tags,
      },
    },
  });
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
