import axios from "axios"
import { Comment } from "./commentService"

export interface Photo {
  id: number
  url: string
  comments: Comment[]
}

export const getPhotos = () => {
  return axios.get<Photo[]>("/api/photos")
}

export const postPhoto = (url: string | ArrayBuffer | null) => {
  return axios.post<Photo>("/api/photos", { url })
}
