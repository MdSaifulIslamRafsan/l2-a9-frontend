export type ReviewStatus = "PENDING" | "DRAFT" | "PUBLISHED" | "UNPUBLISHED";

export interface IReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  purchaseSource?: string;
  imageUrls: string[];
  status: ReviewStatus;
  isPremium: boolean;
  price?: number;
  reasonToUnpublish?: string;
  premiumPrice?: number;

  userId: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
    username: string;
    email: string;
    profileUrl?: string;
    role: string;
  };

  category?: {
    id: string;
    name: string;
  };
  upvotes: number;
  downvotes: number;
  netVotes: number;
}
