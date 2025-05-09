import { Review } from "@/types/reviewTypes";
import { ReviewCard } from "./review-card";


export function ApprovedReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} tab="approved" />
      ))}
    </div>
  )
}