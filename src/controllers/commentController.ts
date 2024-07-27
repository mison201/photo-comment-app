import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@photo/config/prismaClient"

// Controller function to handle the creation of a new comment
// Parameters:
// - req: The HTTP request object
// - res: The HTTP response object
export const createComment = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { text, photoId } = req.body

  // Validate the text input to ensure it is a non-empty string
  if (!text || typeof text !== "string") {
    return res.status(400).json({ message: "Invalid input. Text is required." })
  }

  // Validate the photoId input to ensure it is a number
  if (!photoId || typeof photoId !== "number") {
    return res.status(400).json({
      message: "Invalid input. photoId is required and should be a number.",
    })
  }

  try {
    // Create a new comment record in the database using Prisma
    const comment = await prisma.comment.create({
      data: { text, photoId },
    })

    // Respond with the created comment object and a 201 status code
    return res.status(201).json(comment)
  } catch (error) {
    // Log any errors that occur during the comment creation process
    console.error("Error creating comment:", error)

    // Respond with a 500 status code for internal server errors
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

// Controller function to handle fetching all comments
// Parameters:
// - _: The HTTP request object (unused)
// - res: The HTTP response object
export const getComments = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch all comment records from the database using Prisma
    const comments = await prisma.comment.findMany()

    // Respond with the list of comments and a 200 status code
    return res.status(200).json(comments)
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching comments:", error)

    // Respond with a 500 status code for internal server errors
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
