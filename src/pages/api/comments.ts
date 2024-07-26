import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { text, photoId } = req.body
    const comment = await prisma.comment.create({
      data: { text, photoId },
    })
    res.status(201).json(comment)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
