"use client";

import { useEffect, useState } from "react";

const useHttp = (url: string) => {
  const [responseCode, setResponseCode] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [delay, setDelay] = useState(6000);
  useEffect(() => {
    if (errorMsg) {
      const id = setTimeout(() => {
        setErrorMsg("");
      }, delay);

      return () => {
        clearTimeout(id);
      };
    }
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg) {
      const id = setTimeout(() => {
        setSuccessMsg("");
      }, delay);

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

  const get = async (accessToken: string | null, cache?: any) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: cache!,
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log(response);
        throw new HTTPError("failed to fetch");
      }

      setResponseCode(200);
      setIsLoading(false);

      return data;
    } catch (errorMsg) {
      if (errorMsg instanceof HTTPError) {
        setIsLoading(false);
        setErrorMsg(errorMsg.message || "something went wrong");
        setResponseCode(404);
        console.log("errorMsg", errorMsg.message);
      }
    }
  };

  const post = async (body: any, accessToken: string | null) => {
    try {
      console.log(body);
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
      return response_json;
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message);
      }
    }
  };

  const put = async (body: any, accessToken: string | null) => {
    try {
      console.log(body);
      setIsLoading(true);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response_json = await response.json();
      console.log(response_json);

      if (!response.ok) {
        setResponseCode(response_json.code);
        throw new HTTPError(response_json.message || "Something went wrong");
      }

      setIsLoading(false);
      setResponseCode(200);
      setSuccessMsg(response_json.message);
      return 200;
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message);
        setResponseCode(404);
        return 404;
      }
    }
  };

  const login = async (body: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log(response);
      const response_json = await response.json();
      console.log(response_json);

      if (!response.ok) {
        setResponseCode(response_json.code);
        throw new HTTPError(response_json.message + ". Try signing up!");
      }

      setIsLoading(false);
      setResponseCode(200);
      setSuccessMsg("Logged in successfully");

      return response_json;
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message || "Something went wrong");
      }
    }
  };

  const refresh = async (refreshToken: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      console.log(response);
      const response_json = await response.json();
      console.log(response_json);

      if (!response.ok) {
        setResponseCode(response_json.code);
        throw new HTTPError(response_json.message + ". Try signing up!");
      }

      setIsLoading(false);
      setResponseCode(200);
      setSuccessMsg("Logged in successfully");
      return response_json;
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(error.message || "Something went wrong");
      }
    }
  };

  const applyDelay = (delay: number) => {
    setDelay(delay);
  };
  return {
    isLoading,
    errorMsg,
    successMsg,
    responseCode,
    applyDelay,
    get,
    post,
    put,
    login,
    refresh,
  };
};

export default useHttp;
