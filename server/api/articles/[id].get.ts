import { z } from "zod";
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.number({ coerce: true }),
    }).parse
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
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
