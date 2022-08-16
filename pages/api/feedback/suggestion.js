import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const info = await req.body;
  /* const user = await prisma.suggestion.create({
    data: {
      message: info.message
    },
  }); */
  res.status(200).json(info);
}
