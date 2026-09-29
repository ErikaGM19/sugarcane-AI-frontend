export interface Prediction {
  class: string
  confidence: number
  all_probabilities: Record<string, number>
}

export interface DiseaseInfo {
  sintomas: string
  causas: string
  recomendaciones: string
  generated: boolean
  recognized?: boolean
}

export interface ClassifyResponse {
  filename: string
  prediction: Prediction
  disease_info: DiseaseInfo
}