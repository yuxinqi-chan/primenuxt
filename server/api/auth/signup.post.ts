import { generateId } from "lucia";
import * as yup from "yup";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const { username, password } = await readYupBody(
    event,
    yup.object({
      username: yup.string().min(3).max(31).required(),
      password: yup.string().min(6).max(255).required(),
    }),
  );
  const lucia = event.context.lucia;
  const prisma = event.context.prisma;
  const hashedPassword = await hashPassword(password);
  const userId = generateId(15);

  try {
    await prisma.user.create({
      data: {
        id: userId,
        username,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize(),
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw createError({
        status: 400,
        statusMessage: error.message,
      });
    }
    throw error;
  }
});
