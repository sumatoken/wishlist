import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const user = await prisma.user.create({
    data: {
      fullname: info.fullname,
      email: info.email,
      password: info.password,
    },
  });
  res.status(200).json(user);
}
