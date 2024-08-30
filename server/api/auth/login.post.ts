import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(
    event,
    z.object({
      username: z.string().min(3).max(31),
      password: z.string().min(6).max(255),
    }).parse,
  );
  const lucia = event.context.lucia;
  const prisma = event.context.prisma;
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser || !existingUser.hashedPassword) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid emails/username from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid emails.
    // However, valid emails can be already be revealed with the signup page
    // and a similar timing issue can likely be found in password reset implementation.
    // It will also be much more resource intensive.
    // Since protecting against this is none-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If emails/usernames are public, you may outright tell the user that the username is invalid.
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
