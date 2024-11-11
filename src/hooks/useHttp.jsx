import { useCallback, useEffect, useState } from "react";

async function sendRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong , Failed To Fetch The Data",
    );
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const handleRequest = useCallback(
    async function handleRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something Went Wrong!!");
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (config && config.method === "GET") {
      handleRequest();
    }
  }, [handleRequest, config]);

  return { error, data, isLoading, handleRequest, clearData };
}
