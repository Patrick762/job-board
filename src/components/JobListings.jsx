import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./common/button";
import { locations } from "@/constants/locations";
import SearchBar from "./SearchBar";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  

  const [jobType, setJobType] = useState("");

  const fetchJobs = async () => {
    try {
      const type = jobType ? `&type=${jobType}` : '';
      const location = currentLocation ? `location.city=${currentLocation}` : '';
      const apiURL = isHome
        ? "/api/jobs?_limit=3"
        : `/api/jobs?${location}${type}&_page=${page}&_per_page=6`;
      const res = await fetch(apiURL);
      const data = await res.json();
      setJobs(data );
      setHasNext(data.next);
      setHasPrev(data.prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async ( word ) => {
    try {

      //const apiURL = `/api/jobs?title_like=${title}&_page=${page}&_per_page=6`;
      const type = jobType ? `&type=${jobType}` : '';
      const location = currentLocation ? `location.city=${currentLocation}` : '';
      const query = word ? `&q=${word}` : '';
      
      const apiURL = `/api/jobs?${location}${type}${query}&_page=${page}&_per_page=6`;
      const res = await fetch(apiURL);
      const data = await res.json();
      setJobs(data);
      setHasNext(data.next);
      setHasPrev(data.prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentLocation, page]);

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleChange = async (e) => {
    setCurrentLocation(e.target.value);
  };
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {/* search bar & filter */}
        {!isHome && (

          <>
            <div className="flex justify-end my-5 gap-5">
              <div className="w-lg">
                <SearchBar searchFn={searchJobs} setJobType={setJobType} jobType={jobType}  />
              </div>
            </div>

            <div className="flex justify-end my-5 gap-5">
              <div className="w-40">
                <select
                  id="countries"
                  defaultValue=""
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose a location</option>
                  {locations.map(({ stateCode, city }) => (
                    <option key={stateCode} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
        {/* content */}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
      {/* pagination */}
      {!isHome && (
        <div className={"flex my-5 justify-center gap-3"}>
          <Button onClick={() => prevPage()} isDisabled={!hasPrev}>
            Prev
          </Button>
          <Button onClick={() => nextPage()} isDisabled={!hasNext}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
};
export default JobListings;
