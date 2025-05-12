import UserPaymentHistory from "@/components/dashboard/payment/UserPaymentHistory";
import { getPaymentByUser } from "@/services/payment";
import React from "react";

export const dynamic = "force-dynamic";
const UserPayment = async () => {
  const payments = await getPaymentByUser();

  return (
    <div>
      <UserPaymentHistory payments={payments} />
    </div>
  );
};

export default UserPayment;
