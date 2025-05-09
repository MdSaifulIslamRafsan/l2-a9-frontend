/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

// get all reviews
export const getAllReviews = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.rating) {
    params.append("rating", query?.rating.toString());
  }

  if (query?.category) {
    params.append("category", query?.category.toString());
  }
  if (query?.sortBy) {
    params.append("sortBy", query?.sortBy.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews?${params}`,
      {
        next: {
          tags: ["REVIEW"],
        },
      }
    );
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
          // Authorization: "",
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
          // authorization:
          //   "",
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
