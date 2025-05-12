import CheckoutPage from "@/components/Checkout/CheckoutPage";
import { getReviewById } from "@/services/review";
import { Review } from "@/types/reviewTypes";
import React from "react";
type Params = Promise<{ reviewId: string }>;
const ReviewCheckout = async ({ params }: { params: Params }) => {
  const { reviewId } = await params;
  const review: Review = await getReviewById(reviewId);
  return (
    <div>
      <CheckoutPage review={review} />
      {/* <CheckoutPage /> */}
    </div>
  );
};

export default ReviewCheckout;
