"use client";

import { dateFormatter } from "@/lib/dateFormatter";
import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import { useRef } from "react";
import { BiCommentDots, BiDownvote, BiUpvote } from "react-icons/bi";
import CommentSection from "../Comments/CommentSection";

const ReviewDetails = ({ review }: { review: IReview }) => {
  const commentSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      const top =
        commentSectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 100;

      window.scrollTo({
        top: top - offset,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="container mx-auto my-10">
        <div className="relative w-full bg-black/10 dark:bg-white/10 min-h-[450px] rounded-xl object-cover">
          <p className="absolute bottom-4 right-4 bg-primary/40 inline-block px-3 py-1 rounded-[20px] text-sm">
            {review.category?.name}
          </p>
        </div>
        <h2 className="text-2xl sm:text-4xl font-semibold mt-4">
          {review.title}
        </h2>
        <div className="flex items-center gap-1 my-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="fill-yellow-400 size-4" />
          ))}
          <span className="tracking-widest"> ({review.rating})</span>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-4">
          <div className="size-12 rounded-full bg-black/5 dark:bg-white/10"></div>
          <h2 className="text-[15px]">{review.user?.username}</h2>
        </div>

        <div className="flex  items-center gap-8 mb-8">
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-xl">
              <BiUpvote className="text-2xl hover:fill-amber-400 duration-300 cursor-pointer" />{" "}
              {review.upvotes}
            </span>
            <span className="flex items-center gap-1 text-xl">
              <BiDownvote className="text-2xl hover:fill-amber-400 duration-300 cursor-pointer" />{" "}
              {review.downvotes}
            </span>
          </div>
          <span
            onClick={scrollToComments}
            className="flex items-center gap-1 text-xl  cursor-pointer group"
          >
            <BiCommentDots className="text-2xl group-hover:fill-amber-400 duration-300" />{" "}
            2
          </span>
          <p className="text-base">
            {review.createdAt && dateFormatter(review.createdAt)}
          </p>
        </div>

        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          exercitationem repellat tenetur dolores debitis. Ratione, amet? Magni
          iste sed molestias vitae labore tempore amet omnis corrupti velit sit
          est a, eligendi ex exercitationem minima voluptate quibusdam ipsum
          obcaecati alias quo aperiam possimus expedita dignissimos perferendis.
          Enim in rem obcaecati! Mollitia vero, enim ut reiciendis error illum
          consequatur repudiandae ab tempora porro nostrum, et magnam.
          Laboriosam labore sunt omnis inventore repellat aspernatur laudantium
          quis odit, qui provident neque aliquam officia assumenda! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Pariatur exercitationem
          repellat tenetur dolores debitis. Ratione, amet? Magni iste sed
          molestias vitae labore tempore amet omnis corrupti velit sit est a,
          eligendi ex exercitationem minima voluptate quibusdam ipsum obcaecati
          alias quo aperiam possimus expedita dignissimos perferendis. Enim in
          rem obcaecati! Mollitia vero, enim ut reiciendis error illum
          consequatur repudiandae ab tempora porro nostrum, et magnam.
          Laboriosam labore sunt omnis inventore repellat aspernatur laudantium
          quis odit, qui provident neque aliquam officia assumenda!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          exercitationem repellat tenetur dolores debitis. Ratione, amet? Magni
          iste sed molestias vitae labore tempore amet omnis corrupti velit sit
          est a, eligendi ex exercitationem minima voluptate quibusdam ipsum
          obcaecati alias quo aperiam possimus expedita dignissimos perferendis.
          Enim in rem obcaecati! Mollitia vero, enim ut reiciendis error illum
          consequatur repudiandae ab tempora porro nostrum, et magnam.
          Laboriosam labore sunt omnis inventore repellat aspernatur laudantium
          quis odit, qui provident neque aliquam officia assumenda! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Pariatur exercitationem
          repellat tenetur dolores debitis. Ratione, amet? Magni iste sed
          molestias vitae labore tempore amet omnis corrupti velit sit est a,
          eligendi ex exercitationem minima voluptate quibusdam ipsum obcaecati
          alias quo aperiam possimus expedita dignissimos perferendis. Enim in
          rem obcaecati! Mollitia vero, enim ut reiciendis error illum
          consequatur repudiandae ab tempora porro nostrum, et magnam.
          Laboriosam labore sunt omnis inventore repellat aspernatur laudantium
          quis odit, qui provident neque aliquam officia assumenda!
        </p>
      </div>
      {/* comments  */}
      <CommentSection commentRef={commentSectionRef} />
    </>
  );
};

export default ReviewDetails;
