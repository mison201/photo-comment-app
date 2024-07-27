import { message } from "antd"
import { RcFile, UploadRequestOption } from "rc-upload/lib/interface"
import { Photo, postPhoto } from "@photo/services/photoService"

// Helper function to check if a file is an image based on its MIME type
// Parameters:
// - file: The file to check
// Returns: A boolean indicating whether the file is an image
function isImageFile(file: File | Blob): boolean {
  return file.type.startsWith("image/")
}

// Function to handle the upload of an image file
// Parameters:
// - options: Upload options containing the file and other settings
// - setPhotos: Function to update the photos state
export const handleUpload = (
  options: UploadRequestOption,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
) => {
  const { file } = options as { file: RcFile }

  // Validate the uploaded file to ensure it is an image
  if (!isImageFile(file)) {
    message.error("Uploaded file is not an image.")
    return
  }

  // Create a FileReader to read the file as a data URL
  const reader = new FileReader()
  reader.onloadend = () => {
    // Post the photo to the server using the postPhoto function
    postPhoto(reader.result)
      .then((response) => {
        // Update the photos state with the newly uploaded photo
        setPhotos((prevPhotos) => [...prevPhotos, response])
        // Display a success message
        message.success("Photo uploaded successfully!")
      })
      .catch((error) => {
        // Display an error message if the upload fails
        if (error.response && error.response.data) {
          message.error(
            error.response.data?.message || "Failed to upload photo.",
          )
        } else {
          message.error("Failed to upload photo.")
        }
      })
  }

  // Read the file as a data URL
  reader.readAsDataURL(file)
}
