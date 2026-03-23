//fetchMovies, fetchMovieDetails, fetchMovieCredits, fetchMovieVideos, fetchMovieReviews

import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchFunction();

      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String('An unknown error occurred')));
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;