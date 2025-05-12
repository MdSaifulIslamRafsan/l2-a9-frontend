import { getAllReviews } from "@/services/review";
import { IReview } from "@/types/review";
import ReviewCard from "./ReviewCard";

const MostPopularReview = async () => {
  const { data: response } = await getAllReviews("1", "6", {
    sortBy: "mostPopular",
  });
  return (
    <section className="container mx-auto my-20">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-10">
        Most Popular Reviews
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {response?.data?.map((review: IReview) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </section>
  );
};

export default MostPopularReview;
