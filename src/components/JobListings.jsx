import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./common/button";

import SearchBar from "./SearchBar";
import LocationFilter from "./LocationFilter";

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
      const type = jobType ? `&type=${jobType}` : "";
      const location = currentLocation
        ? `location.city=${currentLocation}`
        : "";
      const apiURL = isHome
        ? "/api/jobs?_limit=3"
        : `/api/jobs?${location}${type}&_page=${page}&_per_page=6`;
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

  const searchJobs = async (word) => {
    try {
      //const apiURL = `/api/jobs?title_like=${title}&_page=${page}&_per_page=6`;
      const type = jobType ? `&type=${jobType}` : "";
      const location = currentLocation
        ? `location.city=${currentLocation}`
        : "";
      const query = word ? `&q=${word}` : "";

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

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {/* search bar & filter */}
        {!isHome && (
          <div className="flex justify-center items-center gap-2 p-4">
            <SearchBar
              searchFn={searchJobs}
              setJobType={setJobType}
              jobType={jobType}
            />

            <LocationFilter
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          </div>
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
