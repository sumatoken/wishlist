import { hash } from "bcryptjs";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const hashedPassword = await hash(info.password, 10).then(function (hash) {
    return hash;
  });
  const user = await prisma.user.create({
    data: {
      fullname: info.fullname,
      email: info.email,
      password: hashedPassword,
    },
  });
  res.status(200).json(user);
}
