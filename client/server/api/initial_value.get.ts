import prisma from "~/utils/prisma";

export default defineEventHandler(async (ev) => {
	return await prisma.currency.findMany({
		orderBy: { createdAt: "desc" },
		take: 30,
		distinct: ["rateFloat"],
	});
});
