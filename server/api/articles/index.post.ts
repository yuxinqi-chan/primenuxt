import * as yup from "yup";

export default defineEventHandler(async (event) => {
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
  const media = useStorage("media");
  for (const part of multiPartDatas) {
    if (part.filename && part.type && part.name) {
      const id = crypto.randomUUID();
      await media.setItemRaw(
        `${id}/${part.filename}`,
        new File([part.data], part.filename, { type: part.type }),
        {
          httpMetadata: {
            contentType: part.type,
          },
        },
      );
      articleFields.content = articleFields.content.replace(
        part.name,
        `/media/${id}/${part.filename}`,
      );
    }
  }
  const prisma = usePrisma(event);
  const article = await prisma.article.create({
    data: {
      ...articleFields,
      tags: {
        connect: tags,
      },
    },
  });
  return article;
});
