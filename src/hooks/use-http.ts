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
        console.log(response);
        throw new HTTPError("failed to fetch");
      }

      const data = await response.json();

      setIsLoading(false);

      return data;
    } catch (error) {
      if (error instanceof HTTPError) {
        setIsLoading(false);
        setError(error.message || "something went wrong");
        console.log("error");
      }
    }
  };

  const post = async (body: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });

      const response_message = await response.json();

      if (!response.ok) {
        throw new HTTPError(response_message.message);
      }

      console.log(response_message);
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
    isLoading,
    error,
    get,
    post,
  };
};

export default useHttp;
