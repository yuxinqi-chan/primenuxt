import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const { username, password } = await readYupBody(
    event,
    yup.object({
      username: yup.string().min(3).max(31).required(),
      password: yup.string().min(6).max(255).required(),
    }),
  );
  const lucia = event.context.lucia;
  const prisma = event.context.prisma;
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser || !existingUser.hashedPassword) {
    throw createError({
      status: 400,
      statusMessage: "Invalid username or password",
    });
  }

  const validPassword = await verifyPassword(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    throw createError({
      status: 400,
      statusMessage: "Invalid username or password",
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );

  // NOTE: It's recommended to setup a cron-job to delete expired sessions
  await lucia.deleteExpiredSessions();
});
