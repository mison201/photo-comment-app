import axios from "axios"

export interface Comment {
  id: number
  text: string
  photoId: number
}

export const postComment = (text: string, photoId: number) => {
  return axios.post<Comment>("/api/comments", { text, photoId })
}
