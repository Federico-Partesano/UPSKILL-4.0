import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface IuseFetch {
  callApi: <T = any>(config: AxiosRequestConfig<any>) => Promise<T>;
  isLoading: boolean;
}

const useFetch = (): IuseFetch => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = async <T>(config: AxiosRequestConfig<any>) => {
      setIsLoading(true);
      const { data } = await axios.request<T>(config);
      setIsLoading(false);
      return data;
  };

  return { callApi, isLoading };
};

export default useFetch;
