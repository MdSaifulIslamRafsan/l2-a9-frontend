import { IReview } from "@/types/review";
import { getAllReviews } from "../../services/review";
import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

const AllReviews = async () => {
  const { data: reviews } = await getAllReviews();
  return (
    <section className="w-full">
      <ReviewHeader />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {reviews?.map((review: IReview) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default AllReviews;
