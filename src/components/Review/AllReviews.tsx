import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

const AllReviews = () => {
  return (
    <section className="w-full">
      <ReviewHeader />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {[...Array(20)].map((review) => (
          <ReviewCard key={review} />
        ))}
      </div>
    </section>
  );
};

export default AllReviews;
