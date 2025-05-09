"use client";

import { IReview } from "@/types/review";
import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

const AllReviews = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <section className="w-full">
      <ReviewHeader />
      {reviews.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {reviews?.map((review: IReview) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="ml-5 mt-8">No reviews found!</p>
      )}
    </section>
  );
};

export default AllReviews;
