import { z } from "zod";
export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readValidatedBody(
    event,
    z.object({
      id: z.number({ coerce: true }),
      title: z.string().min(1).max(100),
      image: z.string().url().optional().nullable(),
      content: z.string().min(1).max(5000),
      published: z.boolean().optional(),
    }).parse,
  );
  const prisma = usePrisma(event);
  const article = await prisma.article.update({
    where: {
      id: body.id,
    },
    data: body,
  });
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
