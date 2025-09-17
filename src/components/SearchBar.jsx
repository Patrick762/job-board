import { useState, useEffect } from "react";
import Button from "./common/button";
import { jobTypes } from "@/constants/jobTypes";

function SearchBar({ searchFn, setJobType, jobType }) {
    const [ searchWord, setSearchWord ] = useState('');

    const handleSearch = () => {
        searchFn( searchWord );
    }


    const handleSearchWordChange = async (e) => {
        
        setSearchWord(e.target.value) 
    };





    return (
        <div className="flex gap-2">
            <form>
                <select
                    id="type"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value) }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Choose a type</option>
                    {jobTypes.map(({ type }) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                    ))}
                </select>

            
                <input
                    type="text"
                    placeholder="Type here" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={searchWord}
                    onChange={handleSearchWordChange} />
                
                <Button onClick={() => handleSearch()}>
                    Search
                </Button>
            </form>
        </div>

    )
}

export default SearchBar;