import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { isImage } from "@photo/helpers/imageHelper"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { url } = req.body

    if (!(await isImage(url))) {
      return res.status(400).json({ message: "Uploaded file is not an image." })
    }

    const photo = await prisma.photo.create({
      data: { url },
    })
    res.status(201).json(photo)
  } else if (req.method === "GET") {
    const photos = await prisma.photo.findMany({
      include: { comments: true },
    })
    res.status(200).json(photos)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
