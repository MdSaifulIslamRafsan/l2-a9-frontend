"use client";
import { Star } from "lucide-react";
import { useState } from "react";

const ReviewSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleRating = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const categoriesData = [
    "Gadgets",
    "Clothing",
    "Books",
    "Medicines",
    "Clothin",
    "Book",
    "Medicine",
  ];

  return (
    <div className="w-full sticky top-24">
      <div>
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex items-center gap-4 my-4 flex-wrap">
          {categoriesData.map((category, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategory(category)}
              className={`border border-primary hover:bg-primary hover:dark:bg-primary/70 dark:text-white hover:text-white py-1.5 px-4 rounded-[30px] font-medium text-sm duration-300 ${
                selectedCategory === category &&
                "bg-primary dark:bg-primary/70 text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Filter By Ratings</h2>
        <div className="space-y-2 mt-3">
          {[1, 2, 3, 4, 5].map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRating === r}
                onChange={() => handleRating(r)}
                className="accent-primary size-4  cursor-pointer"
              />
              <span className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300 select-none">
                {r}{" "}
                {[...Array(r)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 size-4" />
                ))}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSidebar;
