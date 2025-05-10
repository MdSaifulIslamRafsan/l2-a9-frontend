/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const getAllPayment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`);

    const response = await res.json();
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Payments:", error);
    return [];
  }
};

export const createPayment = async (payment: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getPaymentByUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-payment}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Payments fetched:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching payments:", error.message);
    return null;
  }
};

export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment?order_id=${orderId}`
    );

    if (!response.ok) {
      return { success: false, message: "Failed to verify payment" };
    }
    // console.log("response", response);

    return await response.json();
  } catch (error) {
    console.error("Verify payment error:", error);
    return { success: false, message: "Failed to verify payment" };
  }
};

export const getSinglePayment = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Payments fetched:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching payments:", error.message);
    return null;
  }
};

//testing purpose
export const getCategoriesAdmin = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};

export const createPremiumReview = async (formData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VySWQiOiI5OWMyODNmZi01NTg5LTRhZjctOTJmNS1lNDQ3M2Q0YjkzZDIiLCJpYXQiOjE3NDY4MTYzMjMsImV4cCI6MTc0Njg1MjMyM30.1a2tNXnddo_O1Z2MtUXy06Jrjwl-ZLAhDV3N-kNXRvg",
      },

      body: formData,
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("API error:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
};
