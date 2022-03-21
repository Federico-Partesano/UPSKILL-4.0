import { useState } from "react";
import axios, { Method, AxiosRequestConfig } from "axios";
import useFetch from "./useFetch";
import {getUrlApi} from "../endpoints";

type IBody = Record<"name" | "email" | "password", string> & {
  createdAt: number;
};

type IuseSignUp = {
  fetchSignUp: (
    config: AxiosRequestConfig<IBody>
  ) => Promise<{ message: string } | undefined>,
  isLoading: boolean,
  error: string
  };
const useSignUp = (): IuseSignUp => {
  const { callApi, isLoading, error } = useFetch();
  const fetchSignUp = async (
    config: AxiosRequestConfig<IBody>
  ) =>{
    const resp = await callApi<{ message: string }>({
      ...config,
      url: getUrlApi("auth/signup"),
    });
    return resp;
  }
   

  return {fetchSignUp, isLoading, error };
};

export default useSignUp;
