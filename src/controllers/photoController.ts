import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@photo/config/prismaClient"
import { isImage } from "@photo/helpers/imageHelper"

// Controller function to handle the creation of a new photo
// Parameters:
// - req: The HTTP request object
// - res: The HTTP response object
export const createPhoto = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { url } = req.body

  // Validate the URL input to ensure it is a non-empty string
  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "Invalid input. URL is required." })
  }

  // Check if the URL points to a valid image
  const isValidImage = await isImage(url)
  if (!isValidImage) {
    return res.status(400).json({ message: "Uploaded file is not an image." })
  }

  try {
    // Create a new photo record in the database using Prisma
    const photo = await prisma.photo.create({
      data: { url },
    })

    // Respond with the created photo object and a 201 status code
    return res.status(201).json(photo)
  } catch (error) {
    // Log any errors that occur during the photo creation process
    console.error("Error creating photo:", error)

    // Respond with a 500 status code for internal server errors
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

// Controller function to handle fetching all photos
// Parameters:
// - req: The HTTP request object
// - res: The HTTP response object
export const getPhotos = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch all photo records from the database using Prisma
    const photos = await prisma.photo.findMany({
      include: { comments: true }, // Include associated comments in the response
    })

    // Respond with the list of photos and a 200 status code
    return res.status(200).json(photos)
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching photos:", error)

    // Respond with a 500 status code for internal server errors
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
