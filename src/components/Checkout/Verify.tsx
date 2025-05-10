"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calendar,
  Receipt,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VerifyProps {
  orderData: {
    success: boolean;
    message: string;
    data?: {
      id: string;
      amount: number;
      transactionId: string;
      bank_status: string;
      sp_code: string;
      sp_message: string;
      method: string;
      date_time: string;
      transactionStatus: string | null;
      status: string;
      reviewId: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
      review: {
        id: string;
        title: string;
        description: string;
        imageUrls: string[];
        isPremium: boolean;
        premiumPrice: number;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

const Verify = ({ orderData }: VerifyProps) => {
  const router = useRouter();

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (e) {
      console.log(e);
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "UNPAID":
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  if (!orderData.success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle>Payment Verification Failed</CardTitle>
            <CardDescription className="text-red-600">
              {orderData.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              We couldnt verify your payment. Please try again or contact
              support if the issue persists.
            </p>
            <Button onClick={() => router.push("/premium")}>
              Return to Premium Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orderData.data) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-yellow-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle>Payment Information Not Found</CardTitle>
            <CardDescription>
              We couldnt find information about this payment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              The payment information youre looking for could not be found.
              Please check the order ID and try again.
            </p>
            <Button onClick={() => router.push("/premium")}>
              Return to Premium Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const paymentData = orderData.data;

  // Payment is found, now check status
  if (paymentData.status === "PAID") {
    // Success case - show detailed information
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your payment has been verified and you now have access to the
              premium review.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Details */}
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-3">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      ৳{paymentData.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Transaction ID:
                    </span>
                    <span className="font-medium">
                      {paymentData.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Method:
                    </span>
                    <span className="font-medium">
                      {paymentData.method || "Online Payment"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{getStatusBadge(paymentData.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {formatDate(
                        paymentData.date_time || paymentData.updatedAt
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span
                      className="font-medium truncate max-w-[180px]"
                      title={paymentData.id}
                    >
                      {paymentData.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Details */}
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-3">Purchased Review</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <div className="relative h-32 w-full rounded-md overflow-hidden bg-muted">
                    <Image
                      src={
                        paymentData.review.imageUrls?.[0] ||
                        "/placeholder.svg?height=200&width=200" ||
                        "/placeholder.svg"
                      }
                      alt={paymentData.review.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/4 space-y-2">
                  <h4 className="text-xl font-medium">
                    {paymentData.review.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {paymentData.review.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{formatDate(paymentData.review.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Premium
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <Receipt className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">
                    Receipt Generated
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    A receipt has been generated for your purchase. You can view
                    your payment history in your account.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() =>
                router.push(
                  `/premium/reviews/${paymentData.reviewId}?unlocked=true`
                )
              }
              className="w-full sm:w-auto"
            >
              View Premium Review <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/profile/payments")}
              className="w-full sm:w-auto"
            >
              View Payment History
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    // Payment not successful (PENDING or UNPAID)
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-yellow-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle>Payment Not Successful</CardTitle>
            <CardDescription>
              Your payment is {paymentData.status.toLowerCase()}. Please try
              again or contact support.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Simple Payment Details */}
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">
                    {paymentData.transactionId || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{getStatusBadge(paymentData.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {formatDate(paymentData.date_time || paymentData.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {paymentData.sp_message && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Payment Message
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      {paymentData.sp_message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() =>
                router.push(`/checkout?reviewId=${paymentData.reviewId}`)
              }
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/premium")}
              className="w-full sm:w-auto"
            >
              Return to Premium Reviews
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
};

export default Verify;
