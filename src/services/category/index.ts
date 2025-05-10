/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        tags: ['CATEGORIES'],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};

export const createCategory = async (data: { name: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to create category'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};
