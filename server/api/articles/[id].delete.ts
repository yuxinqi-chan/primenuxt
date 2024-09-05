import * as yup from "yup";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const { id } = await getYupRouterParams(
    event,
    yup.object({
      id: yup.number().integer().positive().required(),
    }),
  );
  const prisma = usePrisma(event);
  await prisma.article.delete({
    where: {
      id,
    },
  });
  setResponseStatus(event, 204);
});
