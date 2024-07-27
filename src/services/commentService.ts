import axios, { AxiosResponse } from "axios"
import config from "@photo/config/setting"

// Define the structure of a Comment object
export interface Comment {
  id: number
  text: string
  photoId: number
}

// Function to post a comment to the server
// Parameters:
// - text: The content of the comment
// - photoId: The ID of the photo the comment is associated with
// Returns: A Promise that resolves to the created Comment object
export const postComment = async (
  text: string,
  photoId: number,
): Promise<Comment> => {
  try {
    // Make a POST request to the server to create a new comment
    // The request URL is constructed using the base API URL from the config file
    // The request body contains the text and photoId properties
    const response: AxiosResponse<Comment> = await axios.post<Comment>(
      `${config.apiBaseUrl}/comments`,
      { text, photoId },
    )

    // Return the data from the response, which is the created Comment object
    return response.data
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      // Log the error message or the response data if available
      console.error(
        "Error posting comment:",
        error.response?.data || error.message,
      )
    } else {
      // Log any unexpected errors that are not Axios errors
      console.error("Unexpected error:", error)
    }

    // Rethrow the error to be handled by the caller of this function
    throw error
  }
}
