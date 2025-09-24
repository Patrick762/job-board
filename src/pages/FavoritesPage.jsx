import JobListing from "@/components/JobListing.jsx";
import { getFavorites } from "@/components/lib/storage";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { fetchJobsByIds } from "@/components/lib/api_client";

// TODO Error message if no favorites available

const FavouritesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favorites = getFavorites();

    const fetch = async () => {
      setLoading(true);
      const fetched = await fetchJobsByIds(favorites);

      if (!fetched) {
        return;
      }

      setLoading(false);
      setJobs(fetched);
    };

    fetch();
  }, []);

  const onFavoriteButtonClick = async () => {
    const favorites = getFavorites();

    setLoading(true);
    const fetched = await fetchJobsByIds(favorites);

    if (!fetched) {
      return;
    }

    setLoading(false);
    setJobs(fetched);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Your Favourites
          </h2>
          <div>
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobListing key={job.id} job={job} onFavoriteButtonClick={onFavoriteButtonClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FavouritesPage;
