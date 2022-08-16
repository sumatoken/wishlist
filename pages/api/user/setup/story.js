import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  const user = await prisma.user.update({
    where: {
      id: info.id,
    },
    data: {
      story: info.story.story,
      profileCompletion: 9,
    },
  });
  res.status(200).json(user);
}
