export interface Prediction {
  class: string
  confidence: number
  all_probabilities: Record<string, number>
  simulated: boolean
}

export interface ClassifyResponse {
  filename: string
  prediction: Prediction
}