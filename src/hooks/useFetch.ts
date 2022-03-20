import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface IuseFetch {
  callApi: <T = any>(config: AxiosRequestConfig<any>) => Promise<T | undefined>;
  isLoading: boolean;
  error: string;
}

const useFetch = (): IuseFetch => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const callApi = async <T>(config: AxiosRequestConfig<any>) => {
 
      setIsLoading(true);
      try {
      const { data } = await axios.request<T>(config);
      return data;
    } catch (e: any) {
      const message = (e.response?.data?.message || e.toJSON()?.message)
      typeof message === "string" && setError(message as string);
    }
    setIsLoading(false);

  };

  return { callApi, isLoading, error };
};

export default useFetch;
