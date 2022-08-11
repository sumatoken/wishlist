import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const request = await req.body;
  const user = await prisma.user.update({
    where: {
      id: request.session.user.id,
    },
    data: {
      password: request.info.new_password,
    },
  });
  res.status(200).json(user);
}
