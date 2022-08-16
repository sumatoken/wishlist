import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = req.body;
  const user = await prisma.user.update({
    where: {
      id: info.id,
    },
    data: {
      username: info.alias,
    },
  });
  res.status(200).json(user);
}
