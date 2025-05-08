import CheckoutPage from "@/components/Checkout/CheckoutPage";
import React from "react";
type Params = Promise<{ reviewId: string }>;
const ReviewCheckout = async ({ params }: { params: Params }) => {
  const { reviewId } = await params;
  console.log(reviewId);
  //   const reviews = await getSingleReviewForPayment(reviewId)
  return (
    <div>
      {/* <CheckoutPage reviews={reviews}/> */}
      <CheckoutPage />
    </div>
  );
};

export default ReviewCheckout;
