/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

// get all reviews
export const getAllReviews = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }

  if (query?.category) {
    params.append("categories", query?.category.toString());
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      next: {
        tags: ["REVIEW"],
      },
    });
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/reviews?limit=${limit}&page=${page}&${params}`,
    //     {
    //       next: {
    //         tags: ["PRODUCT"],
    //       },
    //     }
    //   );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getReviewById = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWtpcXVyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwidXNlcklkIjoiZWE3YTA3MWQtNDhlZC00ZGVkLTlhNTEtMDU1MWFiZmZmMmJiIiwiaWF0IjoxNzQ2NzQ3MDI0LCJleHAiOjE3NDY3NDc2MjR9.rjKR9tQjS9nUStcsijwHAJ5mBd3NNfOIL5xS1W2aYrg",
        },
        next: {
          tags: ["REVIEW"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const makeVote = async (reviewId: string, voteType: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/votes/${reviewId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWtpcXVyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwidXNlcklkIjoiZWE3YTA3MWQtNDhlZC00ZGVkLTlhNTEtMDU1MWFiZmZmMmJiIiwiaWF0IjoxNzQ2NzQ3MDI0LCJleHAiOjE3NDY3NDc2MjR9.rjKR9tQjS9nUStcsijwHAJ5mBd3NNfOIL5xS1W2aYrg",
        },
        body: JSON.stringify({ vote: voteType }),
        credentials: "include",
        next: {
          tags: ["REVIEW"],
        },
      }
    );

    revalidateTag("REVIEW");

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};
