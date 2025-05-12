import { getReviewById } from '@/services/review';
import { getCategories } from '@/services/category';
import EditReviewForm from '@/components/EditReviewForm';

export default async function EditReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const [reviewData, categoriesData] = await Promise.all([
    getReviewById(params.id),
    getCategories(),
  ]);

  return (
    <EditReviewForm
      review={reviewData.data}
      categories={categoriesData.data}
      params={params}
    />
  );
}