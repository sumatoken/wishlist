import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const link = await prisma.link.update({
    where: {
      id: info.id,
    },
    data: {
      url: info.editedUrl,
    },
  });
  res.status(200).json(link);
}
