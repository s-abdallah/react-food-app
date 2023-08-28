import { useCallback, useState } from "react";

const useFetch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectHTTP = useCallback(async (config, httpCallback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        body: config.body ? JSON.stringify(config.body) : null,
        headers: config.headers ? config.headers : {},
      });

      if (!response.ok) {
        throw new Error("Bad Request !!");
      }

      const data = await response.json();

      httpCallback(data);

    } catch (err) {
      setLoading(false);
      setError(err.message || "something is wrong");
    }

    setLoading(false);
  }, []);

  return {
    loading,
    error,
    connectHTTP,
  };
};

export default useFetch;
