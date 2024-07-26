import { message } from "antd"
import { postComment } from "@photo/services/commentService"
import { Photo } from "@photo/services/photoService"

export const handleCommentChange = (
  photoId: number,
  value: string,
  setComment: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>,
) => {
  setComment((prev) => ({ ...prev, [photoId]: value }))
}

export const handleCommentSubmit = (
  photoId: number,
  comment: { [key: number]: string },
  setComment: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
) => {
  const text = comment[photoId]
  if (!text) {
    message.error("Please enter a comment before submitting.")
    return
  }

  postComment(text, photoId).then((response) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => {
        if (photo && photo.id === photoId) {
          return {
            ...photo,
            comments: photo?.comments
              ? [...photo.comments, response.data]
              : [response.data],
          }
        }
        return photo
      }),
    )
    setComment((prev) => ({ ...prev, [photoId]: "" }))
    message.success("Comment added successfully!")
  })
}
