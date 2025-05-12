"use client";

import { IReview } from "@/types/review";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../pagination/Pagination";
import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

export type TPaginationInfo = {
  total?: number;
  page: number;
  limit?: number;
  totalPages?: number;
};

type IProps = {
  reviews: IReview[];
  paginationInfo: TPaginationInfo;
};

const AllReviews = ({ reviews, paginationInfo }: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();  

  const currentPage = Number(paginationInfo?.page || searchParams.get("page"));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <section className="w-full">
      <ReviewHeader />
      {reviews?.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {reviews?.map((review: IReview) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="ml-5 mt-8">No reviews found!</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={paginationInfo?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default AllReviews;
