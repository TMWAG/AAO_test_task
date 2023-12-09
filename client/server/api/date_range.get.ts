import prisma from "~/utils/prisma";

export default defineEventHandler(async (ev) => {
  const query = getQuery(ev);
  return await prisma.currency.findMany({
    
    where: {
			AND: {
				createdAt: {
					lt: query.to as string,
					gte: query.from as string,
				},
			},
		},
  });
})