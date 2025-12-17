import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

export const SearchInput = () => {
  return (
    <form className="flex-1 w-full max-w-[600px] rounded-full flex items-center">
      {/* Search part */}

      <input
        type="text"
        placeholder="Search"
        className="flex-1 w-full pl-4 pr-12 focus:border-blue-400 focus:outline-none h-full rounded-l-full border border-light-gray shadow-2xs"
      />
      {/* Search icon part */}
      <div className="">
        <Button
          type="submit"
          className="flex justify-center items-center h-full border border-light-gray-300 bg-light-gray-100 rounded-r-full rounded-l-none pl-5! pr-4! disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-gray-300 border-l-0"
          variant="ghost"
        >
          <Search className="size-[25px]" />
        </Button>
      </div>
    </form>
  );
};
