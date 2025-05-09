/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getCommentsByReviewId = async (reviewId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${reviewId}`, {
      next: {
        tags: ["COMMENTS"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};
