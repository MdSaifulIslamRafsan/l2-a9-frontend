'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { Review } from '@/types/reviewTypes';
import { toast } from 'react-toastify';

type ReviewCardProps = {
  review: Review;
  tab: 'pending' | 'approved' | 'rejected';
  onStatusChange?: () => void; // Callback to refresh parent component after status change
};

export function ReviewCard({ review, tab, onStatusChange }: ReviewCardProps) {
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
console.log(onStatusChange)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${review.id}/approve`
      );
      toast.success(
        res?.data?.message || 'The review has been published successfully'
      );
      onStatusChange?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRejectionDialog = () => {
    setRejectionDialogOpen(true);
    setRejectionReason('');
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${review.id}/reject`,
        {
          reason: rejectionReason,
        }
      );
      toast.success(res?.data?.message || 'The review has been unpublished');
      setRejectionDialogOpen(false);
      onStatusChange?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <Card className="gap-0">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="line-clamp-1">{review.title}</CardTitle>
            <Badge
              variant="outline"
              className={
                review.status === 'PENDING'
                  ? 'bg-yellow-50 text-yellow-600'
                  : review.status === 'PUBLISHED'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-600'
              }
            >
              {review.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-gray-700 line-clamp-2 w-[95%]">
            {review.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="text-sm text-gray-500">By {review.user.name}</span>
            <span className="text-sm text-gray-500">
              Posted on {formatDate(review.createdAt)}
            </span>
          </div>
          {review.reasonToUnpublish && (
            <div className="mt-2 p-3 bg-red-50 rounded-md flex gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{review.reasonToUnpublish}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {tab === 'pending' ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-green-600"
                onClick={handleApprove}
                disabled={isSubmitting}
              >
                <CheckCircle className="h-4 w-4" />
                {isSubmitting ? 'Approving...' : 'Approve'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-red-600"
                onClick={openRejectionDialog}
                disabled={isSubmitting}
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </div>
          ) : (
            <Link href={`/reviews/${review.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Review</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this review. This will be
              shown to the user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectionDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim() || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Reject Review'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
