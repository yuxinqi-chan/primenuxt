import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const { id } = await getYupRouterParams(
    event,
    yup.object({
      id: yup.number().integer().positive(),
    }),
  );
  const prisma = usePrisma(event);
  const article = await prisma.article.findUnique({
    include: {
      articleTags: {
        include: {
          tag: true,
        },
      },
    },
    where: {
      id,
    },
  });
  if (!article || (!user && !article.published)) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
