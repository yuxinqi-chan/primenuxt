import * as yup from "yup";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readYupBody(
    event,
    yup.object({
      name: yup.string().min(1).max(100).required(),
    }),
  );
  const prisma = usePrisma(event);
  const tag = await prisma.tag.create({
    data: body,
  });
  return tag;
});
