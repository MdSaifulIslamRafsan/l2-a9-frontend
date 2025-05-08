/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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
        // headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
        // },
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
