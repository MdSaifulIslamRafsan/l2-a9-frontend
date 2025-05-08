import { redirect } from "next/navigation";
import { Suspense } from "react";

import Verify from "@/components/Checkout/Verify";
import { verifyPayment } from "@/services/payment";

// Loading component for Suspense
const VerifyLoading = () => (
  <div className="container py-12">
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-lg font-medium">Verifying your payment...</p>
        </div>
      </div>
    </div>
  </div>
);

// This page handles the ShurjoPay redirect with query parameters
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.order_id as string;

  if (!orderId) {
    return redirect("/");
  }

  const orderData = await verifyPayment(orderId);

  return (
    <div className="container py-8">
      <Suspense fallback={<VerifyLoading />}>
        <Verify orderData={orderData} />
      </Suspense>
    </div>
  );
}
