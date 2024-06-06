"use client";

import { useState } from "react";

const useHttp = (url: string) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  class HTTPError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "HTTPError";
    }
  }

  const get = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new HTTPError("failed to fetch");
      }
      const data = await response.json();
      console.log(data);
      return data;
      setIsLoading(false);
    } catch (error) {
      if (error instanceof HTTPError) {
        setIsLoading(false);
        setError(error.message || "something went wrong");
        console.log("error");
      }
    }
  };

  return {
    get,
  };
};

export default useHttp;
