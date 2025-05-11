"use client";

import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Payment Type Definition
interface Payment {
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
  user: {
    id: string;
    name: string;
    email: string;
  };
  review: {
    id: string;
    title: string;
  };
}

interface AdminPaymentHistoryProps {
  payments: Payment[];
}

const AdminPaymentHistory: React.FC<AdminPaymentHistoryProps> = ({
  payments,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search Functionality
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchString = searchTerm.toLowerCase();
      return (
        payment.transactionId.toLowerCase().includes(searchString) ||
        payment.method.toLowerCase().includes(searchString) ||
        payment.status.toLowerCase().includes(searchString) ||
        payment.user.email.toLowerCase().includes(searchString) ||
        payment.review.title.toLowerCase().includes(searchString)
      );
    });
  }, [payments, searchTerm]);

  // Format date function using built-in Intl.DateTimeFormat
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // Render Status Badge Function
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">Successful</Badge>;
      case "PENDING":
        return <Badge variant="warning">Processing</Badge>;
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          View all payment transactions. Total {payments.length} payment
          records.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-[340px] lg:max-w-7xl">
        <div className="mb-4 flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transaction ID, user or review..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>Tk {payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.user.email}</TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={payment.review.title}
                    >
                      {payment.review.title}
                    </TableCell>
                    <TableCell>{formatDate(payment.date_time)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPaymentHistory;
