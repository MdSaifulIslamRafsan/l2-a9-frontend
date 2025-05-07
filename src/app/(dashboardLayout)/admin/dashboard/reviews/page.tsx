"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

type Review = {
  id: string
  title: string
  description: string
  rating: number
  category: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
  }
  createdAt: string
  status: "pending" | "approved" | "rejected"
  rejectionReason?: string
}

export default function AdminPage() {

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")



  useEffect(() => {

    const fetchReviews = async () => {
      try {
  
        await new Promise((resolve) => setTimeout(resolve, 1000))

     
        setReviews([
          {
            id: "1",
            title: "Amazing Wireless Headphones",
            description: "These headphones have incredible sound quality and battery life.",
            rating: 5,
            category: {
              id: "electronics",
              name: "Electronics",
            },
            user: {
              id: "user-123",
              name: "John Doe",
            },
            createdAt: "2023-04-15T10:30:00Z",
            status: "pending",
          },
          {
            id: "2",
            title: "Disappointing Coffee Maker",
            description: "This coffee maker broke after just two weeks of use.",
            rating: 2,
            category: {
              id: "home-appliances",
              name: "Home Appliances",
            },
            user: {
              id: "user-456",
              name: "Jane Smith",
            },
            createdAt: "2023-04-10T14:20:00Z",
            status: "pending",
          },
          {
            id: "3",
            title: "Perfect Running Shoes",
            description:
              "These running shoes provide excellent support and are very comfortable for long-distance running.",
            rating: 5,
            category: {
              id: "fashion",
              name: "Fashion",
            },
            user: {
              id: "user-789",
              name: "Mike Johnson",
            },
            createdAt: "2023-04-05T09:15:00Z",
            status: "approved",
          },
          {
            id: "4",
            title: "Offensive Content",
            description: "This review contained inappropriate language.",
            rating: 1,
            category: {
              id: "books",
              name: "Books",
            },
            user: {
              id: "user-101",
              name: "Alex Brown",
            },
            createdAt: "2023-04-02T16:45:00Z",
            status: "rejected",
            rejectionReason: "Review contains inappropriate language that violates our community guidelines.",
          },
        ])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        setLoading(false)
      }
    }

    fetchReviews()
    // if (user && user.role === "admin") {
    // }
  }, [])

  const handleApproveReview = (reviewId: string) => {
    // In a real app, this would call your API
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, status: "approved" } : review)))
  }

  const openRejectionDialog = (reviewId: string) => {
    setSelectedReviewId(reviewId)
    setRejectionReason("")
    setRejectionDialogOpen(true)
  }

  const handleRejectReview = () => {
    if (!selectedReviewId || !rejectionReason.trim()) return

    // In a real app, this would call your API
    setReviews(
      reviews.map((review) =>
        review.id === selectedReviewId ? { ...review, status: "rejected", rejectionReason } : review,
      ),
    )

    setRejectionDialogOpen(false)
    setSelectedReviewId(null)
    setRejectionReason("")
  }

  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const pendingReviews = reviews.filter((review) => review.status === "pending")
  const approvedReviews = reviews.filter((review) => review.status === "approved")
  const rejectedReviews = reviews.filter((review) => review.status === "rejected")

  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage reviews and site content</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingReviews.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedReviews.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedReviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-4 w-1/4" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : pendingReviews.length > 0 ? (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="line-clamp-1">{review.title}</CardTitle>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
                        Pending
                      </Badge>
                    </div>
                    {/* <StarRating rating={review.rating} /> */}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-700">{review.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <Badge variant="outline" className="bg-orange-50 text-orange-600">
                        {review.category.name}
                      </Badge>
                      <span className="text-sm text-gray-500">By {review.user.name}</span>
                      <span className="text-sm text-gray-500">Posted on {formatDate(review.createdAt)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-green-600"
                        onClick={() => handleApproveReview(review.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-red-600"
                        onClick={() => openRejectionDialog(review.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Pending Reviews</CardTitle>
                <CardDescription>There are no reviews waiting for approval.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          {approvedReviews.length > 0 ? (
            <div className="space-y-4">
              {approvedReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="line-clamp-1">{review.title}</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        Approved
                      </Badge>
                    </div>
                    {/* <StarRating rating={review.rating} /> */}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-700">{review.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <Badge variant="outline" className="bg-orange-50 text-orange-600">
                        {review.category.name}
                      </Badge>
                      <span className="text-sm text-gray-500">By {review.user.name}</span>
                      <span className="text-sm text-gray-500">Posted on {formatDate(review.createdAt)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/reviews/${review.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Approved Reviews</CardTitle>
                <CardDescription>There are no approved reviews yet.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6">
          {rejectedReviews.length > 0 ? (
            <div className="space-y-4">
              {rejectedReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="line-clamp-1">{review.title}</CardTitle>
                      <Badge variant="outline" className="bg-red-50 text-red-600">
                        Rejected
                      </Badge>
                    </div>
                    {/* <StarRating rating={review.rating} /> */}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-700">{review.description}</p>

                    {review.rejectionReason && (
                      <div className="mt-2 p-3 bg-red-50 rounded-md flex gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-600">{review.rejectionReason}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mt-3">
                      <Badge variant="outline" className="bg-orange-50 text-orange-600">
                        {review.category.name}
                      </Badge>
                      <span className="text-sm text-gray-500">By {review.user.name}</span>
                      <span className="text-sm text-gray-500">Posted on {formatDate(review.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Rejected Reviews</CardTitle>
                <CardDescription>There are no rejected reviews.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Review</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this review. This will be shown to the user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectReview} disabled={!rejectionReason.trim()}>
              Reject Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
