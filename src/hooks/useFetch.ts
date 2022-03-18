import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface IuseFetch {
  callApi: <T = any>(config: AxiosRequestConfig<any>) => Promise<T>;
  isLoading: boolean;
}

const useFetch = (): IuseFetch => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const callApi = async <T>(config: AxiosRequestConfig<any>) => {
 
      setIsLoading(false);
      const { data } = await axios.request<T>(config);
      setIsLoading(true);
      return data;
    
  };

  return { callApi, isLoading };
};

export default useFetch;
