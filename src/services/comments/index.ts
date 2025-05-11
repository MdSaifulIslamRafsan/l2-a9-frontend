/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getCommentsByReviewId = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${reviewId}`,
      {
        next: {
          tags: ["COMMENTS"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};

export const makeComment = async (payload: {
  content: string;
  reviewId: string;
  parentId?: string;
}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      next: {
        tags: ["COMMENTS"],
      },
    });

    revalidateTag("COMMENTS");
    revalidateTag("REVIEW");

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};
