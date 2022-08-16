import { hash } from "bcryptjs";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const request = await req.body;
  const hashedPassword = await hash(request.info.new_password, 10).then(
    function (hash) {
      return hash;
    }
  );
  const user = await prisma.user.update({
    where: {
      id: request.session.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  res.status(200).json(user);
}
