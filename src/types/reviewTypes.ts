
export type Review = {
  id: string
  title: string
  description: string
  rating: number
  purchaseSource: string
  imageUrls: string[]
  status: "PENDING" | "PUBLISHED" | "UNPUBLISHED" | "DRAFT"
  isPremium: boolean
  price: number
  reasonToUnpublish: string | null
  premiumPrice: number | null
  userId: string
  categoryId: string
  category : {
    name : string
  }
  createdAt: string
  updatedAt: string
  user: {
    name: string
    username: string
    email: string
  }
  upvotes: number
  downvotes: number
  netVotes: number
}

export type ApiResponse = {
  success: boolean
  message: string
  data: Review[]
}