import axios, { AxiosResponse } from "axios"
import config from "@photo/config/setting"
import { Comment } from "./commentService"

// Define the structure of a Photo object
export interface Photo {
  id: number
  url: string
  comments: Comment[]
}

// Function to get all photos from the server
// Returns: A Promise that resolves to an array of Photo objects
export const getPhotos = async (): Promise<Photo[]> => {
  try {
    // Make a GET request to the server to fetch all photos
    // The request URL is constructed using the base API URL from the config file
    const response: AxiosResponse<Photo[]> = await axios.get<Photo[]>(
      `${config.apiBaseUrl}/photos`,
    )

    // Return the data from the response, which is an array of Photo objects
    return response.data
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      // Log the error message or the response data if available
      console.error(
        "Error fetching photos:",
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

// Function to post a new photo to the server
// Parameters:
// - url: The URL of the photo, which can be a string or an ArrayBuffer or null
// Returns: A Promise that resolves to the created Photo object
export const postPhoto = async (
  url: string | ArrayBuffer | null,
): Promise<Photo> => {
  try {
    // Make a POST request to the server to create a new photo
    // The request URL is constructed using the base API URL from the config file
    // The request body contains the url property
    const response: AxiosResponse<Photo> = await axios.post<Photo>(
      `${config.apiBaseUrl}/photos`,
      { url },
    )

    // Return the data from the response, which is the created Photo object
    return response.data
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      // Log the error message or the response data if available
      console.error(
        "Error posting photo:",
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
