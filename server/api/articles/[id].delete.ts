import { z } from "zod";
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.number({ coerce: true }),
    }).parse
  );
  const prisma = usePrisma(event);
  await prisma.article.delete({
    where: {
      id,
    },
  });
  setResponseStatus(event, 204);
});
