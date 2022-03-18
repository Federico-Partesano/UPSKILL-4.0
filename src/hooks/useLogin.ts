import { useState } from "react";
import axios, { Method, AxiosRequestConfig } from "axios";
import useFetch from "./useFetch";
import {getUrlApi} from "../endpoints";
type IAxiosRequestConfigData = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};
type IBody = Record<"name" | "email" | "password", string> & {
  createdAt: Date;
};
type IuseLogin = [
  (
    config: AxiosRequestConfig<IAxiosRequestConfigData>
  ) => Promise<{ message: string }>,
  boolean
];
const useLogin = (): IuseLogin => {
  const { callApi, isLoading } = useFetch();
  const fetchRegistration = async (
    config: AxiosRequestConfig<{
      name: string;
      email: string;
      password: string;
      createdAt: Date;
    }>
  ) =>
    callApi<{ message: string }>({
      ...config,
      url: getUrlApi("/auth/signup"),
    });

  return [fetchRegistration, isLoading];
};

export default useLogin;
