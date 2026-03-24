//fetchMovies, fetchMovieDetails, fetchMovieCredits, fetchMovieVideos, fetchMovieReviews

import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
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
  }, [fetchFunction])

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;