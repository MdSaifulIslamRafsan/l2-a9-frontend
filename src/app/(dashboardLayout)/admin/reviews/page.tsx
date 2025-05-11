import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Review } from '@/types/reviewTypes';
import { PendingReviews } from '@/components/admin/reviews/pending-reviews';
import { RejectedReviews } from '@/components/admin/reviews/rejected-reviews';
import { ApprovedReviews } from '@/components/admin/reviews/approved-reviews';


export default async function AdminPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const reviews = data?.data?.data;
  console.log(reviews)

  const pendingReviews = reviews?.filter(
    (review: Review) => review.status === 'PENDING'
  );
  const approvedReviews = reviews?.filter(
    (review: Review) => review.status === 'PUBLISHED'
  );
  const rejectedReviews = reviews?.filter(
    (review: Review) => review.status === 'UNPUBLISHED'
  );

  return (
    <div className="container px-4 py-6 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage reviews</h1>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingReviews.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedReviews.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedReviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {pendingReviews.length > 0 ? (
            <PendingReviews reviews={pendingReviews} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Pending Reviews</CardTitle>
                <CardDescription>
                  There are no reviews waiting for approval.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          {approvedReviews.length > 0 ? (
            <ApprovedReviews reviews={approvedReviews} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Approved Reviews</CardTitle>
                <CardDescription>
                  There are no approved reviews yet.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6">
          {rejectedReviews.length > 0 ? (
            <RejectedReviews reviews={rejectedReviews} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Rejected Reviews</CardTitle>
                <CardDescription>
                  There are no rejected reviews.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
