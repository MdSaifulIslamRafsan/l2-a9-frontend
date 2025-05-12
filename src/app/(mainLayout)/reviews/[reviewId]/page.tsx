import NotFound from "@/app/not-found";
import ReviewDetails from "@/components/Review/ReviewDetails";
import { getCurrentUser } from "@/services/auth";
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
  const userData = await getCurrentUser();

  if (!res?.data) {
    return NotFound();
  }

  return (
    <ReviewDetails review={res.data} comments={comments} userData={userData} />
  );
};

export default ReviewDetailsPage;
