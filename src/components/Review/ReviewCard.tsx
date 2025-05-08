import { dateFormatter } from "@/lib/dateFormatter";
import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import Link from "next/link";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <Link
      href={`/reviews/${review.id}`}
      className="p-8 bg-black/5 dark:bg-white/10 rounded-xl"
    >
      <div className="w-full bg-black/5 dark:bg-white/5 min-h-[200px] rounded-tl-xl rounded-tr-xl relative">
        <p className="absolute bottom-2 right-2 bg-primary/40 inline-block px-3 py-1 rounded-[20px] text-xs">
          {review.category?.name}
        </p>
      </div>
      <h2 className="text-lg font-semibold mt-2 line-clamp-2">
        {review.title}
      </h2>
      <div className="flex items-center gap-1 my-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="fill-yellow-400 size-4" />
        ))}
        <span className="tracking-widest"> ({review.rating})</span>
      </div>

      <div className="flex  items-center justify-between gap-2">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[17px]">
            <BiUpvote /> {review.upvotes}
          </span>
          <span className="flex items-center gap-1 text-[17px]">
            <BiDownvote /> {review.downvotes}
          </span>
        </div>
        <p className="text-sm">
          {review.createdAt && dateFormatter(review.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="size-10 rounded-full bg-black/5 dark:bg-white/10"></div>
        <h2 className="text-sm">{review.user?.username}</h2>
      </div>
    </Link>
  );
};

export default ReviewCard;
