import NotFound from "@/app/not-found";
import ReviewDetails from "@/components/Review/ReviewDetails";
import { getCommentsByReviewId } from "@/services/comments";
import { getReviewById } from "../../../../services/review";

const ReviewDetailsPage = async ({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) => {
  const { reviewId } = await params;
  const res = await getReviewById(reviewId);
  const { data: comments } = await getCommentsByReviewId(reviewId);

  if (!res?.data) {
    return NotFound();
  }

  return <ReviewDetails review={res.data} comments={comments} />;
};

export default ReviewDetailsPage;
