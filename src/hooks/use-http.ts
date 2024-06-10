"use client";

import { useEffect, useState } from "react";

const useHttp = (url: string) => {
  const [responseCode, setResponseCode] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorMsg) {
      const id = setTimeout(() => {
        setErrorMsg("");
      }, 6000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg) {
      const id = setTimeout(() => {
        setSuccessMsg("");
      }, 6000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [successMsg]);

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
    } catch (errorMsg) {
      if (errorMsg instanceof HTTPError) {
        setIsLoading(false);
        setErrorMsg(errorMsg.message || "something went wrong");
        console.log("errorMsg");
      }
    }
  };

  const post = async (body: any) => {
    try {
      console.log(body);
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });

      const response_json = await response.json();
      console.log(response_json);

      if (!response.ok) {
        setResponseCode(response_json.code);
        throw new HTTPError(response_json.message);
      }

      setIsLoading(false);
      setResponseCode(200);
      setSuccessMsg(response_json.message);

      console.log(response_json.message);
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message);
      }
    }
  };

  const login = async (body: any) => {
    try {
      console.log(body);
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });

      const response_json = await response.json();
      console.log(response_json);
      return;
      if (!response.ok) {
        setResponseCode(response_json.code);
        throw new HTTPError(response_json.message);
      }

      setIsLoading(false);
      setResponseCode(200);
      setSuccessMsg(response_json.message);

      console.log(response_json.message);
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message);
      }
    }
  };

  return {
    isLoading,
    errorMsg,
    successMsg,
    responseCode,
    get,
    post,
    login,
  };
};

export default useHttp;
