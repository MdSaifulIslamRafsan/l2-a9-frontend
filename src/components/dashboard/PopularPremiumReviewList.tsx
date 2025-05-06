

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
type TReview = {
    id: string;
    title: string;
    imageUrls: string[]; 
    price: number;
    description: string;
    voteCount: number;
  };
  
const PopularPremiumReviewList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-overview/popular-premium-reviews`,
    { cache: 'no-store' }
  );
  const reviews = await res.json();

  return (
    <Card className="mt-6 border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl  font-semibold">
          🔥 Top 5 Premium Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[340px] pr-3">
          <div className="grid gap-4">
            {reviews?.data?.map((review: TReview) => (
              <Card key={review.id} className="border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
                <CardHeader className="flex justify-between">
                  <CardTitle className="text-lg font-medium">{review.title}</CardTitle>
                  <Badge variant="outline" className="text-xs text-muted-foreground mt-1">
                    Premium Review
                  </Badge>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div className="mb-1 line-clamp-2">
                    {review.description || 'No description provided.'}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span>🗳️ Votes: <span className="font-semibold text-primary">{review.voteCount}</span></span>
                    <span>💰 Price: <span className="font-semibold text-green-600">৳{review.price ?? 0}</span></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PopularPremiumReviewList;
