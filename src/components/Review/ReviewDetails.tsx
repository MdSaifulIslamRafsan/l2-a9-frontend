"use client";

import { dateFormatter } from "@/lib/dateFormatter";
import { makeVote } from "@/services/review";
import { TComment } from "@/types/comments";
import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiCommentDots, BiDownvote, BiUpvote } from "react-icons/bi";
import { MdLock } from "react-icons/md";
import { toast } from "react-toastify";
import CommentSection from "../Comments/CommentSection";

type voteType = "UPVOTE" | "DOWNVOTE" | "NONE";

export type TUserJWTPayload = {
  email: string;
  role: "ADMIN" | "USER";
  userId: string;
  iat: number;
  exp: number;
};

const ReviewDetails = ({
  review,
  comments,
  userData,
}: {
  review: IReview;
  comments: TComment[];
  userData?: TUserJWTPayload;
}) => {
  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const [voteInfo, setVoteInfo] = useState({
    isDownVote: review.voteInfo.isDownVote,
    isUpVote: review.voteInfo.isUpVote,
    upvotes: review.voteInfo.upvotes,
    downvotes: review.voteInfo.downvotes,
  });

  useEffect(() => {
    if (review) {
      setVoteInfo({
        isDownVote: review.voteInfo.isDownVote,
        isUpVote: review.voteInfo.isUpVote,
        upvotes: review.voteInfo.upvotes,
        downvotes: review.voteInfo.downvotes,
      });
    }
  }, [review]);

  const handleVote = async (type: voteType) => {
    if (!userData) {
      toast.error("Please, login first!");
      return;
    }
    if (type === "UPVOTE" && voteInfo.isUpVote) {
      type = "NONE";
    } else if (type === "DOWNVOTE" && voteInfo.isDownVote) {
      type = "NONE";
    }
    await makeVote(review.id, type);
  };

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
        <div className="relative w-full bg-black/10 dark:bg-white/10 h-[450px] min-h-[450px] rounded-xl">
          {review.imageUrls.length > 0 && (
            <Image
              src={review.imageUrls[0]}
              alt={review.imageUrls[0]}
              width={200}
              height={200}
              className="w-full object-contain object-center h-[450px]"
            />
          )}
          <p className="absolute bottom-4 right-4 bg-primary/40 inline-block px-3 py-1 rounded-[20px] text-sm">
            {review.category?.name}
          </p>
          {review.isPremium && (
            <p className="absolute top-2 left-2 bg-blue-500/40 inline-block px-3 py-1 rounded-[20px] text-[10px]">
              Premium
            </p>
          )}
        </div>
        <h2 className="text-2xl sm:text-4xl font-semibold mt-4">
          {review.title}
        </h2>
        <div className="flex items-center gap-1 my-4">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="fill-yellow-400 size-4" />
          ))}
          <span className="tracking-widest"> ({review.rating})</span>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-4">
          {review.user?.profileUrl ? (
            <Image
              className="size-12 rounded-full object-cover"
              src={review.user.profileUrl}
              alt={review.user.name}
              width={40}
              height={40}
            />
          ) : (
            <div className="size-12 rounded-full bg-black/5 dark:bg-white/10"></div>
          )}
          <h2 className="text-[15px]">{review.user?.username}</h2>
        </div>

        <div className="flex  items-center gap-8 mb-8">
          <div className="flex gap-4">
            <span
              onClick={() => handleVote("UPVOTE")}
              className="flex items-center gap-1 text-xl group"
            >
              <BiUpvote
                className={`text-2xl group-hover:fill-amber-400 duration-300 cursor-pointer  ${
                  voteInfo.isUpVote && "fill-amber-400"
                }`}
              />{" "}
              {voteInfo.upvotes}
            </span>
            <span
              onClick={() => handleVote("DOWNVOTE")}
              className="flex items-center gap-1 text-xl group"
            >
              <BiDownvote
                className={`text-2xl group-hover:fill-amber-400 duration-300 cursor-pointer ${
                  voteInfo.isDownVote && "fill-amber-400"
                }`}
              />{" "}
              {voteInfo.downvotes}
            </span>
          </div>
          <span
            onClick={scrollToComments}
            className="flex items-center gap-1 text-xl  cursor-pointer group"
          >
            <BiCommentDots className="text-2xl group-hover:fill-amber-400 duration-300" />{" "}
            {review.commentCount}
          </span>
          <p className="text-base">
            {review.createdAt && dateFormatter(review.createdAt)}
          </p>
        </div>

        {review.isLocked ? (
          <div className="relative">
            <p className="mb-8  text-justify">
              {review.preview}...{" "}
              <span className="blur-lg  select-none text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aspernatur! Odit quidem soluta repellat reiciendis accusantium
                porro perspiciatis, rporis officia? Facere consectetur corrupti
                optio natus alias totam, enim quod laboriosam eum!unde nesciunt
                dolorum eos, quos nostrum saepe animi veniam ex eveniet
                obcaecati dolores quam blanditiis non fugit quaerat quod
                aspernatur adipisint perferendis, et ea error ipsam soluta nihil
                exercitationem repellendus totam corporis officia? Facere
                consectetur corrupti optio natus alias totam, enim quod
                laboriosam eum! perferendis, et ea error ipsam soluta nihil
                exercitationem repellendus totam corporis officia? Facere
                consectetur corrupti optio natus alias totam, enim quod
                laboriosam eum!
              </span>
            </p>
            <p className="mb-8 blur-lg select-none  text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
              aspernatur! Odit quidem soluta repellat reiciendis accusantium
              porro perspiciatis, unde nesciunt dolorum eos, quos nostrum saepe
              animi veniam ex eveniet obcaecati dolores quam blanditiis non
              fugit quaerat quod aspernatur adipisci! Dignissimos dolorum
              dolores fugit eos, excepturi, expedita nesciunt hic maiores
              aliquam laboriosam aperiam quis recusandae sit veritatis porro
              perferendis minus possimus. Fugit provident esse repellat suscipit
              quibusdam eligendi magni architecto corporis culpa. Accusantium
              dolor laborum optio dicta sint perferendis, et ea error ipsam
              soluta nihil exercitationem repellendus totam corporis officia?
              Facere consectetur corrupti optio natus alias totam, enim quod
              laboriosam eum! unde nesciunt dolorum eos, quos nostrum saepe
              animi veniam ex eveniet obcaecati dolores quam blanditiis non
              fugit quaerat quod aspernatur adipisci! Dignissimos dolorum
              dolores fugit eos, excepturi, expedita nesciunt hic maiores
              aliquam laboriosam aperiam quis recusandae sit veritatis porro
              perferendis minus possimus. Fugit provident esse repellat suscipit
              quibusdam eligendi magni architecto corporis culpa. Accusantium
              dolor laborum optio dicta sint perferendis, et ea error ipsam
              soluta nihil exercitationem repellendus totam corporis officia?
              Facere consectetur corrupti optio natus alias totam, enim quod
              laboriosam eum!unde nesciunt dolorum eos, quos nostrum saepe animi
              veniam ex eveniet obcaecati dolores quam blanditiis non fugit
              quaerat quod aspernatur adipisci! Dignissimos dolorum dolores
              fugit eos, excepturi, expedita nesciunt hic maiores aliquam
              laboriosam aperiam quis recusandae sit veritatis porro perferendis
              minus possimus. Fugit provident esse repellat suscipit quibusdam
              eligendi magni architecto corporis culpa. Accusantium dolor
              laborum optio dicta sint perferendis, et ea error ipsam soluta
              nihil exercitationem repellendus totam corporis officia? Facere
              consectetur corrupti optio natus alias totam, enim quod laboriosam
              eum!
            </p>
            <p className="mb-8 blur-lg select-none text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
              aspernatur! Odit quidem soluta repellat reiciendis accusantium
              porro perspiciatis, unde nesciunt dolorum eos, quos nostrum saepe
              animi veniam ex eveniet obcaecati dolores quam blanditiis non
              fugit quaerat quod aspernatur adipisci! Dignissimos dolorum
              dolores fugit eos, excepturi, expedita nesciunt hic maiores
              aliquam laboriosam aperiam quis recusandae sit veritatis porro
              perferendis minus possimus. Fugit provident esse repellat suscipit
              quibusdam eligendi magni architecto corporis culpa. Accusantium
              dolor laborum optio dicta sint perferendis, et ea error ipsam
              soluta nihil exercitationem repellendus totam corporis officia?
              Facere consectetur corrupti optio natus alias totam, enim quod
              laboriosam eum! unde nesciunt dolorum eos, quos nostrum saepe
              animi veniam ex eveniet obcaecati dolores quam blanditiis non
              fugit quaerat quod aspernatur adipisci! Dignissimos dolorum
              dolores fugit eos, excepturi, expedita nesciunt hic maiores
              aliquam laboriosam aperiam quis recusandae sit veritatis porro
              perferendis minus possimus. Fugit provident esse repellat suscipit
              quibusdam eligendi magni architecto corporis culpa. Accusantium
              dolor laborum optio dicta sint perferendis, et ea error ipsam
              soluta nihil exercitationem repellendus totam corporis officia?
              Facere consectetur corrupti optio natus alias totam, enim quod
              laboriosam eum!unde nesciunt dolorum eos, quos nostrum saepe animi
              veniam ex eveniet obcaecati dolores quam blanditiis non fugit
              quaerat
            </p>
            <div className="border border-gray-300 p-6 rounded-lg bg-gray-50 dark:bg-gray-900/30 text-center max-w-md mx-auto absolute top-1/2 left-1/2 -translate-1/2">
              <MdLock className="text-4xl mx-auto text-gray-700 dark:text-white" />
              <h3 className="text-xl font-semibold text-gray-800 my-2 dark:text-gray-200">
                This review is locked
              </h3>
              <p className="text-gray-600 mb-4 dark:text-gray-300">
                To read this review, please complete your payment.
              </p>
              <Link
                href={`/checkout/${review.id}`}
                className="bg-primary text-white px-5 py-2 rounded hover:bg-primary/85 transition"
              >
                Unlock Now
              </Link>
            </div>
          </div>
        ) : (
          <p className="mb-8">{review.description}</p>
        )}
      </div>
      {/* comments  */}
      <div className={`${review?.isLocked && "blur select-none"}`}>
        <CommentSection
          commentRef={commentSectionRef}
          comments={comments}
          reviewId={review.id}
          isLocked={review?.isLocked}
          userData={userData}
        />
      </div>
    </>
  );
};

export default ReviewDetails;
