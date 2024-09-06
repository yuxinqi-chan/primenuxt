import * as yup from "yup";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const { tags, ...articleFields } = await readYupBody(
    event,
    yup.object({
      title: yup.string().min(1).max(100).required(),
      image: yup.string().url().optional(),
      content: yup.string().min(1).required(),
      published: yup.boolean().optional(),
      tags: yup.array(
        yup.object({
          id: yup.number().integer().positive().required(),
          name: yup.string().min(1).max(100).required(),
        }),
      ),
    }),
  );
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
