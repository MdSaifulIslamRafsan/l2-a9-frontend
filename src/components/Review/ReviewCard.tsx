import { Star } from "lucide-react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const ReviewCard = () => {
  return (
    <div className="p-8 bg-black/5 dark:bg-white/10 rounded-xl">
      <div className="w-full bg-black/5 dark:bg-white/5 min-h-[200px] rounded-tl-xl rounded-tr-xl relative">
        <p className="absolute bottom-2 right-2 bg-primary/40 inline-block px-3 py-1 rounded-[20px] text-xs">
          Gadgets
        </p>
      </div>
      <h2 className="text-lg font-semibold mt-2 line-clamp-2">
        Share Your Experience, Help Others Decide
      </h2>
      <div className="flex items-center gap-1 my-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="fill-yellow-400 size-4" />
        ))}
        <span className="tracking-widest"> (5)</span>
      </div>

      <div className="flex  items-center justify-between gap-2">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[17px]">
            <BiUpvote /> 4
          </span>
          <span className="flex items-center gap-1 text-[17px]">
            <BiDownvote /> 2
          </span>
        </div>
        <p className="text-sm">10 January 2024</p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="size-10 rounded-full bg-black/5 dark:bg-white/10"></div>
        <h2 className="text-sm font-semibold">Shakiqur Rahman</h2>
      </div>
    </div>
  );
};

export default ReviewCard;
