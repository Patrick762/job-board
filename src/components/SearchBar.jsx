import { useState } from "react";
import Button from "./common/button";
import { jobTypes } from "@/constants/jobTypes";

function SearchBar({ searchFn, setJobType, jobType }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    searchFn(searchWord);
  };

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <form className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Job Type Select */}
        <div className="flex-1">
          <select
            id="type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full p-3"
          >
            <option value="">Choose a type</option>
            {jobTypes.map(({ type }) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Search Word Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type here"
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full p-3"
            value={searchWord}
            onChange={handleSearchWordChange}
          />
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0">
          <Button
            onClick={() => handleSearch()}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
