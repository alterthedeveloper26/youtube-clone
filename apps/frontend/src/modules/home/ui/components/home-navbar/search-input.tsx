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
        className="flex-1 w-full pl-4 pr-12 focus:border-blue-400 h-full rounded-l-full border-r-0 border border-custom-gray"
      />
      {/* Search icon part */}
      <div className="flex justify-center items-center h-full border border-custom-gray rounded-r-full">
        <Button
          className="h-full rounded-r-full rounded-l-none pl-5!"
          variant="ghost"
        >
          <Search />
        </Button>
      </div>
    </form>
  );
};
