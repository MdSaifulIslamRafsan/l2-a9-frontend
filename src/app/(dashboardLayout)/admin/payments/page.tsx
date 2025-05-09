import AdminPaymentHistory from "@/components/dashboard/payment/AdminPaymentHistory";
import { getAllPayment } from "@/services/payment";
import React from "react";

const GetAllUserPayments = async () => {
  const payments = await getAllPayment();
  return (
    <div>
      <AdminPaymentHistory payments={payments} />
    </div>
  );
};

export default GetAllUserPayments;
