import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const user = await prisma.user.update({
    where: {
      id: info.id,
    },
    data: {
      address: info.address.address,
    },
  });
  res.status(200).json(user);
}
