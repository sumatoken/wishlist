import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const user = await prisma.user.update({
    where: {
      email: info.email,
    },
    data: {
      username: info.alias,
    },
  });
  res.status(200).json(user);
}
