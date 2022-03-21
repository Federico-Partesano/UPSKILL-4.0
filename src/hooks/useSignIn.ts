import { useState } from "react";
import axios, { Method, AxiosRequestConfig } from "axios";
import useFetch from "./useFetch";
import { getUrlApi } from "../endpoints";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../reducer/authReducer";
import { RootState } from "../reducer";
import { IRespSignIn } from "../models/RespSignIn";
import { setStorage } from "../utils/localStorage";

type IBody = Record<"email" | "password", string>;

type IuseSignIn = {
    fetchSignIn:(
    config: AxiosRequestConfig<IBody>
  ) => Promise<{ message: string } | undefined>,
  isLoading: boolean,
  error: string,
  tokenJwt: string | null
  }
const useSignIn = (): IuseSignIn => {
  const dispatch = useDispatch();
  const tokenJwt = setStorage("get", "tokenJwt");

  const { callApi, isLoading, error } = useFetch();

  const fetchSignIn = async (config: AxiosRequestConfig<IBody>) => {

      const resp = await callApi<IRespSignIn>({
        ...config,
        url: getUrlApi("auth/signin"),
      });
      if(!resp)return;
      const { message, tokenJwt, user } = resp;
      if(message === "ok"){
          setStorage("set", "tokenJwt",tokenJwt);
        dispatch(getAuth({tokenJwt, user}));
      }
      return resp;
  };

  return {fetchSignIn, isLoading, error, tokenJwt};
};

export default useSignIn;
