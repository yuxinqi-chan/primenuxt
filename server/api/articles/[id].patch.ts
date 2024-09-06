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
  const articleFields = await readYupBody(
    event,
    yup.object({
      title: yup.string().min(1).max(100),
      image: yup.string().url(),
      content: yup.string().min(1),
      published: yup.boolean(),
    }),
  );
  const prisma = usePrisma(event);
  const article = await prisma.article.update({
    where: {
      id,
    },
    data: articleFields,
  });
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
