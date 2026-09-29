import api from "./axios"
import { ClassifyResponse } from "../types"

export async function classifyImage(file: File): Promise<ClassifyResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await api.post<ClassifyResponse>(
    "/classify",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return response.data
}