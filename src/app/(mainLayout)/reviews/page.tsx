import AllReviews from "@/components/Review/AllReviews";
import ReviewSidebar from "@/components/Review/ReviewSidebar";
import { getCategories } from "@/services/category";
import { getAllReviews } from "@/services/review";

type ReviewSearchParams = {
  category?: string;
  rating?: string;
  sortBy?: string;
  searchTerm?: string;
  page?: string;
  limit?: string;
};

const ReviewPage = async ({
  searchParams,
}: {
  searchParams: Promise<ReviewSearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;
  const {
    category,
    rating,
    sortBy,
    page = "1",
    limit = "12",
    searchTerm,
  } = resolvedSearchParams;
  const { data: categories } = await getCategories();

  const { data: response } = await getAllReviews(page, limit, {
    category: category || "",
    rating: rating || "",
    sortBy: sortBy || "",
    searchTerm: searchTerm || "",
  });

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row gap-4  container px-4 mx-auto">
        <div className="w-full md:w-[400px] md:border-r">
          <ReviewSidebar categories={categories} />
        </div>
        <AllReviews reviews={response?.data} paginationInfo={response?.meta} />
      </div>
    </section>
  );
};
export default ReviewPage;
