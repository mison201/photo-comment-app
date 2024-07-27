import { NextApiRequest, NextApiResponse } from "next"
import { createPhoto, getPhotos } from "@photo/controllers/photoController"

// API route handler function to manage photo-related requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle POST requests to create a new photo
  if (req.method === "POST") {
    return createPhoto(req, res)
  }
  // Handle GET requests to fetch all photos
  else if (req.method === "GET") {
    return getPhotos(req, res)
  }
  // Handle unsupported HTTP methods
  else {
    // Set the Allow header to specify allowed methods
    res.setHeader("Allow", ["POST", "GET"])
    // Respond with a 405 status code for method not allowed
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
