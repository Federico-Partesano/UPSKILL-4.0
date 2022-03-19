import { useState } from "react";
import axios, { Method, AxiosRequestConfig } from "axios";
import useFetch from "./useFetch";
import { getUrlApi } from "../endpoints";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../reducer/authReducer";
import { RootState } from "../reducer";

type IBody = Record<"email" | "password", string>;

type IuseSignIn = {
    fetchSignIn:(
    config: AxiosRequestConfig<IBody>
  ) => Promise<{ message: string } | undefined>,
  isLoading: boolean,
  error: string,
  tokenJwt: string | undefined
  }
const useSignIn = (): IuseSignIn => {
  const dispatch = useDispatch();
  const {tokenJwt} = useSelector(({authReducer}: RootState) => authReducer);

  const { callApi, isLoading, error } = useFetch();

  const fetchSignIn = async (config: AxiosRequestConfig<IBody>) => {

      const resp = await callApi<{ message: string; tokenJwt: string }>({
        ...config,
        url: getUrlApi("auth/signin"),
      });
      if(!resp)return;
      const { message, tokenJwt } = resp;
      message === "ok" && dispatch(getAuth(tokenJwt));
      return resp;
  };

  return {fetchSignIn, isLoading, error, tokenJwt};
};

export default useSignIn;
