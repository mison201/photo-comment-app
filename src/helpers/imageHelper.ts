import { fileTypeFromBuffer } from "file-type"
import fetch from "node-fetch"

// Function to check if a given URL points to an image
// Parameters:
// - url: The URL of the file to check
// Returns: A Promise that resolves to a boolean indicating whether the file is an image
export async function isImage(url: string): Promise<boolean> {
  try {
    // Fetch the file from the given URL
    const response = await fetch(url)

    // Convert the response to an array buffer
    const buffer = await response.arrayBuffer()

    // Determine the file type from the buffer
    const fileType = await fileTypeFromBuffer(buffer)

    // Check if the MIME type starts with "image/" and return true if it does
    return fileType?.mime.startsWith("image/") || false
  } catch (error) {
    // Log any errors that occur during the fetching and type checking process
    console.error("Error checking file type:", error)

    // Return false if an error occurs
    return false
  }
}
