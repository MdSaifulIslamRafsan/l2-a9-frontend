import { Search } from "lucide-react";

const ReviewHeader = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-stretch gap-5 md:gap-10">
      <div className="flex items-stretch w-full">
        <input
          type="text"
          className="w-full bg-white/10 border outline-none py-2 px-5"
          placeholder="Search by titles/descriptions"
        />
        <button type="button" className="bg-white/10 p-2 border border-l-0">
          <Search />
        </button>
      </div>

      <div className="flex items-stretch shrink-0">
        <h2 className="font-semibold bg-white/10 px-5 py-2 border border-r-0">
          Sort By
        </h2>
        <select
          name="sortBy"
          id="sortBy"
          className="bg-white/10  py-2.5 px-5 border"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostPopular">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewHeader;
