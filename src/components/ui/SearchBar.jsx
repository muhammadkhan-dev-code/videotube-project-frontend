import React from "react";
import { Search } from "lucide-react";
import {Input} from "../index.js";


const SearchBar = () => {
  return (
    <div className="flex justify-center w-full mt-4 ">
      <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden w-full max-w-3xl h-11 mb-2">
        <Input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full text-base placeholder-gray-500 border-none "
        />
        <button className="bg-gray-100 hover:bg-gray-200 px-5 h-full flex items-center justify-center border-l border-gray-300 mr-3">
          <Search className="text-gray-700 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
