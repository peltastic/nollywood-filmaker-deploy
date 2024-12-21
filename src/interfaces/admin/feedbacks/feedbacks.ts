export interface FeedbackResponse {
    feedbacks: {
      _id: string
      orderId: string
      quality: number
      speed: number
      reason: string
      createdAt: string  
    }[]
}