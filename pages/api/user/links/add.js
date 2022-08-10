import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const link = await prisma.link.create({
    data: {
      url: info.url,
      userId: info.userId,
    },
  });
  res.status(200).json(link);
}
