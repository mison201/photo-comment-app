import { message } from "antd"
import { RcFile, UploadRequestOption } from "rc-upload/lib/interface"
import { Photo, postPhoto } from "@photo/services/photoService"

function isImageFile(file: File | Blob): boolean {
  return file.type.startsWith("image/")
}

export const handleUpload = (
  options: UploadRequestOption,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
) => {
  const { file } = options as { file: RcFile }

  if (!isImageFile(file)) {
    message.error("Uploaded file is not an image.")
    return
  }

  const reader = new FileReader()
  reader.onloadend = () => {
    postPhoto(reader.result)
      .then((response) => {
        setPhotos((prevPhotos) => [...prevPhotos, response.data])
        message.success("Photo uploaded successfully!")
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          message.error(
            error.response.data?.message || "Failed to upload photo.",
          )
        }
      })
  }
  reader.readAsDataURL(file)
}
