/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Verify from "@/components/Checkout/Verify";
import Link from "next/link";
import { verifyPayment } from "@/services/payment";

// Loading component
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

// Error component
const VerifyError = ({ message }: { message: string }) => (
  <div className="container py-12">
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-8 shadow-sm bg-red-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-700">
            Payment Verification Failed
          </h2>
          <p className="text-center text-gray-600">{message}</p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition"
            >
              Return Home
            </Link>
            <a
              href="/premium"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              View Premium Reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Move the logic that uses useSearchParams to a separate component
function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    async function verifyPaymentOrder() {
      try {
        setLoading(true);
        const orderId = searchParams.get("order_id");

        if (!orderId) {
          router.push("/");
          return;
        }

        const result = await verifyPayment(orderId);
        setOrderData(result);
        setLoading(false);
      } catch (err: any) {
        console.error("Error verifying payment:", err);
        setError(err.message || "Failed to verify payment");
        setLoading(false);
      }
    }

    verifyPaymentOrder();
  }, [searchParams, router]);

  if (loading) {
    return <VerifyLoading />;
  }

  if (error) {
    return <VerifyError message={error} />;
  }

  return <Verify orderData={orderData} />;
}

export default function VerifyPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<VerifyLoading />}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
