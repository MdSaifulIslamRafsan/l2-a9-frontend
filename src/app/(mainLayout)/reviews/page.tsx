import AllReviews from "@/components/Review/AllReviews";
import ReviewSidebar from "@/components/Review/ReviewSidebar";

const ReviewPage = () => {
  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row gap-4  container px-4 mx-auto">
        <div className="w-full md:w-[400px] md:border-r">
          <ReviewSidebar />
        </div>
        <AllReviews />
      </div>
    </section>
  );
};

export default ReviewPage;
