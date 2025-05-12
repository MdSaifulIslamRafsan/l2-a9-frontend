/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// get all reviews
export const getAllReviews = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.rating) {
    params.append('rating', query?.rating.toString());
  }

  if (query?.category) {
    params.append('category', query?.category.toString());
  }

  if (query?.sortBy) {
    params.append('sortBy', query?.sortBy.toString());
  }

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ['REVIEW'],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllReviewsForAdmin = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/admin`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['REVIEW'],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleUserReviews = async (id : string) => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['REVIEW'],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const deleteReview = async (reviewId: string) => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['REVIEW'],
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message || 'Failed to delete review' };
    }

    revalidateTag('REVIEW');

    return { success: true, message: 'Review deleted successfully' };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Something went wrong' };
  }
};

export const getReviewById = async (reviewId: string) => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['REVIEW'],
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
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/votes/${reviewId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ vote: voteType }),
        credentials: 'include',
        next: {
          tags: ['REVIEW'],
        },
      }
    );

    revalidateTag('REVIEW');

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};
export const approveReview = async (reviewId: string) => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/approve`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['REVIEW'],
        },
      }
    );

    const data = await res.json();
    revalidateTag('REVIEW');
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Something went wrong' };
  }
};

export const rejectReview = async (reviewId: string, reason: string) => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/reject`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason }),
        next: {
          tags: ['REVIEW'],
        },
      }
    );

    const data = await res.json();
    revalidateTag('REVIEW');
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Something went wrong' };
  }
};

export const createNormalReview = async (reviewData: {
  title: string;
  description: string;
  rating: number;
  categoryId: string;
  status: 'PENDING' | 'DRAFT';
  purchaseSource?: string;
  imageUrls?: string[];
}) => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reviewData),
      next: {
        tags: ['REVIEW'],
      },
    });

    const data = await res.json();
    revalidateTag('REVIEW');
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Something went wrong' };
  }
};

export const updateReview = async (
  reviewId: string,
  updatedData: {
    title: string;
    description: string;
    rating: number;
    categoryId: string;
    status: 'PENDING' | 'DRAFT';
    purchaseSource?: string;
    imageUrls?: string[];
  }
) => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
      next: {
        tags: ['REVIEW'],
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message || 'Failed to update review' };
    }

    const data = await res.json();
    revalidateTag('REVIEW');
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Something went wrong' };
  }
};

