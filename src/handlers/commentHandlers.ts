import { message } from "antd"
import { postComment } from "@photo/services/commentService"
import { Photo } from "@photo/services/photoService"

// Function to handle changes to the comment input field
// Parameters:
// - photoId: The ID of the photo being commented on
// - value: The new comment text
// - setComment: Function to update the comment state
export const handleCommentChange = (
  photoId: number,
  value: string,
  setComment: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>,
) => {
  // Update the comment state for the specific photo ID
  setComment((prev) => ({ ...prev, [photoId]: value }))
}

// Function to handle the submission of a comment
// Parameters:
// - photoId: The ID of the photo being commented on
// - comment: Object containing comments for each photo
// - setComment: Function to update the comment state
// - setPhotos: Function to update the photos state
export const handleCommentSubmit = (
  photoId: number,
  comment: { [key: number]: string },
  setComment: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
) => {
  // Get the comment text for the specific photo ID
  const text = comment[photoId]

  // Validate the comment input
  if (!text) {
    message.error("Please enter a comment before submitting.")
    return
  }

  // Post the comment using the postComment function from the comment service
  postComment(text, photoId).then((response) => {
    // Update the photos state to include the new comment
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => {
        if (photo && photo.id === photoId) {
          return {
            ...photo,
            comments: photo?.comments
              ? [...photo.comments, response]
              : [response],
          }
        }
        return photo
      }),
    )

    // Clear the comment input field for the specific photo ID
    setComment((prev) => ({ ...prev, [photoId]: "" }))

    // Display a success message
    message.success("Comment added successfully!")
  })
}
