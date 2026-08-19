import axios from "axios"
import { ClassifyResponse } from "../types"

export async function classifyImage(file: File): Promise<ClassifyResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post<ClassifyResponse>(
    "http://localhost:8000/classify",  // URL directa por ahora
    formData
  )
  return response.data
}