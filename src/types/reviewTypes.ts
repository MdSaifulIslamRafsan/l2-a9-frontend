export type Review = {
    id: string
    title: string
    description: string
    rating: number
    category: {
      id: string
      name: string
    }
    createdAt: string
    status: "pending" | "approved" | "rejected"
    rejectionReason?: string
    votes: {
      upvotes: number
      downvotes: number
    }
    commentCount: number
  }