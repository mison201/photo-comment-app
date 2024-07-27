import { NextApiRequest, NextApiResponse } from "next"
import {
  createComment,
  getComments,
} from "@photo/controllers/commentController"

// API route handler function to manage comment-related requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle POST requests to create a new comment
  if (req.method === "POST") {
    return createComment(req, res)
  }
  // Handle GET requests to fetch all comments
  else if (req.method === "GET") {
    return getComments(req, res)
  }
  // Handle unsupported HTTP methods
  else {
    // Set the Allow header to specify allowed methods
    res.setHeader("Allow", ["POST", "GET"])
    // Respond with a 405 status code for method not allowed
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
