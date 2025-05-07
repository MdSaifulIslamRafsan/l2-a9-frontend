import { Star } from "lucide-react";
import { BiCommentDots, BiDownvote, BiUpvote } from "react-icons/bi";

const ReviewDetailsPage = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="relative w-full bg-black/10 dark:bg-white/10 min-h-[450px] rounded-xl object-cover">
        <p className="absolute bottom-4 right-4 bg-primary/40 inline-block px-3 py-1 rounded-[20px] text-sm">
          Gadgets
        </p>
      </div>
      <h2 className="text-2xl sm:text-4xl font-semibold mt-4">
        Share Your Experience, Help Others Decide
      </h2>
      <div className="flex items-center gap-1 my-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="fill-yellow-400 size-4" />
        ))}
        <span className="tracking-widest"> (5)</span>
      </div>

      <div className="flex items-center gap-2 mt-3 mb-4">
        <div className="size-12 rounded-full bg-black/5 dark:bg-white/10"></div>
        <h2 className="text-[15px]">Shakiqur Rahman</h2>
      </div>

      <div className="flex  items-center gap-8 mb-8">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-xl">
            <BiUpvote className="text-2xl hover:fill-amber-400 duration-300 cursor-pointer" />{" "}
            4
          </span>
          <span className="flex items-center gap-1 text-xl">
            <BiDownvote className="text-2xl hover:fill-amber-400 duration-300 cursor-pointer" />{" "}
            2
          </span>
        </div>
        <span className="flex items-center gap-1 text-xl">
          <BiCommentDots className="text-2xl hover:fill-amber-400 duration-300 cursor-pointer" />{" "}
          2
        </span>
        <p className="text-base">10 January 2024</p>
      </div>

      <p className="mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        exercitationem repellat tenetur dolores debitis. Ratione, amet? Magni
        iste sed molestias vitae labore tempore amet omnis corrupti velit sit
        est a, eligendi ex exercitationem minima voluptate quibusdam ipsum
        obcaecati alias quo aperiam possimus expedita dignissimos perferendis.
        Enim in rem obcaecati! Mollitia vero, enim ut reiciendis error illum
        consequatur repudiandae ab tempora porro nostrum, et magnam. Laboriosam
        labore sunt omnis inventore repellat aspernatur laudantium quis odit,
        qui provident neque aliquam officia assumenda! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Pariatur exercitationem repellat
        tenetur dolores debitis. Ratione, amet? Magni iste sed molestias vitae
        labore tempore amet omnis corrupti velit sit est a, eligendi ex
        exercitationem minima voluptate quibusdam ipsum obcaecati alias quo
        aperiam possimus expedita dignissimos perferendis. Enim in rem
        obcaecati! Mollitia vero, enim ut reiciendis error illum consequatur
        repudiandae ab tempora porro nostrum, et magnam. Laboriosam labore sunt
        omnis inventore repellat aspernatur laudantium quis odit, qui provident
        neque aliquam officia assumenda!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        exercitationem repellat tenetur dolores debitis. Ratione, amet? Magni
        iste sed molestias vitae labore tempore amet omnis corrupti velit sit
        est a, eligendi ex exercitationem minima voluptate quibusdam ipsum
        obcaecati alias quo aperiam possimus expedita dignissimos perferendis.
        Enim in rem obcaecati! Mollitia vero, enim ut reiciendis error illum
        consequatur repudiandae ab tempora porro nostrum, et magnam. Laboriosam
        labore sunt omnis inventore repellat aspernatur laudantium quis odit,
        qui provident neque aliquam officia assumenda! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Pariatur exercitationem repellat
        tenetur dolores debitis. Ratione, amet? Magni iste sed molestias vitae
        labore tempore amet omnis corrupti velit sit est a, eligendi ex
        exercitationem minima voluptate quibusdam ipsum obcaecati alias quo
        aperiam possimus expedita dignissimos perferendis. Enim in rem
        obcaecati! Mollitia vero, enim ut reiciendis error illum consequatur
        repudiandae ab tempora porro nostrum, et magnam. Laboriosam labore sunt
        omnis inventore repellat aspernatur laudantium quis odit, qui provident
        neque aliquam officia assumenda!
      </p>
    </div>
  );
};

export default ReviewDetailsPage;
