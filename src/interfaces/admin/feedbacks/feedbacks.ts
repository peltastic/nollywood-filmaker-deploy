export interface FeedbackResponse {
    feedbacks: {
      _id: string
      orderId: string
      quality: number
      speed: number
      reason: string
      createdAt: string
      userId: {
        fname: string
        lname: string
        phone: string
        email: string
        profilepics: string
      }
    }[]
}