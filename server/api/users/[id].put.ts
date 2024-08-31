import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const { id } = await getYupRouterParams(
    event,
    yup.object({ id: yup.string().required() }),
  );
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  if (event.context.user.id !== id) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
  const body = await readYupBody(
    event,
    yup.object({
      username: yup.string().min(1).max(100).required(),
      password: yup.string().min(1).max(100).required(),
    }),
  );
  const prisma = usePrisma(event);
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: body.username,
      hashedPassword: await hashPassword(body.password),
    },
  });
  return {
    ...user,
    hashedPassword: undefined,
  };
});
