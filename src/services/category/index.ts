/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        tags: ["CATEGORIES"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};
