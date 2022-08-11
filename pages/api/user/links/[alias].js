import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { alias } = req.query;
  const user =
    (await prisma.user.findUnique({
      where: {
        username: alias,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        story: true,
        address: true,
        links: true,
      },
    })) || null;
  res.status(200).json(user);
}
