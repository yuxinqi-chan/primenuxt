import { generateId } from "lucia";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const lucia = event.context.lucia;
  const prisma = event.context.prisma;
  const config = useRuntimeConfig(event);
  const hashedPassword = await hashPassword(config.adminPassword);
  const userId = generateId(15);
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    throw createError({
      status: 400,
      statusMessage: "Admin user already exists",
    });
  }
  try {
    await prisma.user.create({
      data: {
        id: userId,
        username: config.adminUsername,
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
