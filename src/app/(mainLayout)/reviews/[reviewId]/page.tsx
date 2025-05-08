import NotFound from "@/app/not-found";
import ReviewDetails from "@/components/Review/ReviewDetails";
import { getReviewById } from "../../../../services/review";

const ReviewDetailsPage = async ({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) => {
  const { reviewId } = await params;
  const res = await getReviewById(reviewId);

  if (!res?.data) {
    return NotFound();
  }

  return <ReviewDetails review={res.data} />;
};

export default ReviewDetailsPage;
