import { getReviewById } from '@/services/review';
import { getCategories } from '@/services/category';
import EditReviewForm from '@/components/EditReviewForm';

export default async function EditReviewPage({
  params,
}: {
  params:  Promise<{ id: string }>;
}) {
  const {id} = await params;
  const [reviewData, categoriesData] = await Promise.all([
    getReviewById(id),
    getCategories(),
  ]);

  return (
    <EditReviewForm
      review={reviewData.data}
      categories={categoriesData.data}
      id={id}
    />
  );
}