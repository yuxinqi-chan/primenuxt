import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const { tag, sort, cursorId, size, page, published } = await getYupQuery(
    event,
    yup.object({
      tag: yup.string().min(1).optional(),
      sort: yup.string().oneOf(["asc", "desc"]).default("asc"),
      cursorId: yup.number().integer().positive().optional(),
      page: yup.number().integer().positive().optional(),
      size: yup.number().integer().positive().default(10),
      published: yup.boolean().optional(),
    }),
  );
  const prisma = usePrisma(event);
  const articles = await prisma.article.findMany({
    include: {
      articleTags: {
        include: {
          tag: true,
        },
      },
    },
    where: {
      published: user ? published : true,
      articleTags: tag
        ? {
            some: {
              tag: {
                name: tag,
              },
            },
          }
        : undefined,
    },
    skip: cursorId ? 1 : page ? (page - 1) * size : 0,
    take: size,
    cursor: cursorId ? { id: cursorId } : undefined,
    orderBy: {
      id: sort,
    },
  });
  if (!articles) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return articles;
});
