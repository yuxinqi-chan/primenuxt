import * as yup from "yup";

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
  const { tags, ...articleFields } = await readYupBody(
    event,
    yup.object({
      title: yup.string().min(1).max(100).required(),
      image: yup.string().url().optional(),
      content: yup.string().min(1).required(),
      published: yup.boolean().required(),
      tags: yup.array(
        yup.object({
          id: yup.number().integer().positive().required(),
          name: yup.string().min(1).max(100).required(),
        }),
      ),
    }),
  );
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
