"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EyeIcon } from "lucide-react";

interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: "PAID" | "PENDING" | "FAILED";
  reviewTitle?: string;
  reviewId?: string;
  createdAt: string;
}

const UserPaymentHistory = ({ payments }: { payments: Payment[] }) => {
  console.log(payments);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <Card className="w-full my-10">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          View all your premium review purchases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Transaction ID
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    You haven&apos;t made any payments yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-[200px] sm:max-w-[300px] truncate">
                        {payment.reviewTitle || "Premium Review"}
                      </div>
                      <div className="md:hidden text-xs text-muted-foreground mt-1">
                        {formatDate(payment.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell>Tk {payment.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={
                          payment.status === "PAID" ? "success" : "default"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-mono text-xs">
                        {payment.transactionId}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Future: Action buttons like View Review */}
                      <EyeIcon />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPaymentHistory;
