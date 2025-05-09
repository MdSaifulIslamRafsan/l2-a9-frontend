import AllReviews from "@/components/Review/AllReviews";
import ReviewSidebar from "@/components/Review/ReviewSidebar";
import { getCategories } from "@/services/category";
import { getAllReviews } from "@/services/review";

type ReviewSearchParams = {
  category?: string;
  rating?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
};

const ReviewPage = async ({
  searchParams,
}: {
  searchParams: ReviewSearchParams;
}) => {
  const { category, rating, sortBy, page = "1", limit = "10" } = await searchParams;
  const { data: categories } = await getCategories();

  const { data: reviews } = await getAllReviews(page, limit, {
    category: category || "",
    rating: rating || "",
    sortBy: sortBy || "",
  });

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row gap-4  container px-4 mx-auto">
        <div className="w-full md:w-[400px] md:border-r">
          <ReviewSidebar categories={categories} />
        </div>
        <AllReviews reviews={reviews} />
      </div>
    </section>
  );
};
export default ReviewPage;
