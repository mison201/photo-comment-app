import { fileTypeFromBuffer } from "file-type"
import fetch from "node-fetch"

export async function isImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const fileType = await fileTypeFromBuffer(buffer)
    return fileType?.mime.startsWith("image/") || false
  } catch (error) {
    console.error("Error checking file type:", error)
    return false
  }
}
