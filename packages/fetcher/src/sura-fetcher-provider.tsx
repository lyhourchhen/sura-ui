import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { createContext, FC, ReactNode, useContext } from "react";
import { TheUseQueryInstance } from "./types";
import React from "react";

export type MethodConfig = {
  update: Extract<AxiosRequestConfig["method"], "put" | "patch">;
};
export interface SuraFetcherContextInterface {
  axiosInstance: AxiosInstance;
  useQueryInstance: TheUseQueryInstance;
  /**
   * @description override the method
   * @example gogym and krubkrong and sgg2022 project are completely different from the api
   */
  methodConfig?: MethodConfig;
  paramInterceptor: {
    /**
     * @example gogym
     * `response?.data.items`
     * @example asurraa
     * `response?.data`
     */
    data: (response: AxiosResponse) => string;
    /**
     * @example gogym
     * response?.data.meta
     * @example asurraa
     * response?.meta
     */
    meta: (response: AxiosResponse) => string;
  };
  singleParamInterceptor: {
    data: (response: AxiosResponse) => string;
  };
  paramConfig?: {
    pageParamName: string;
    limitParamName: string;
    searchParamName: string;
    pageDefaultValue: number;
    limitDefaultValue: number;
  };
  children?: ReactNode | JSX.Element;
}

export type ParamConfig = SuraFetcherContextInterface["paramConfig"];
export type SuraFetcherConfig = SuraFetcherContextInterface;

export const SuraFetcherContext = createContext<
  SuraFetcherContextInterface | undefined
>(undefined);

export const SuraFetcherProvider: FC<SuraFetcherContextInterface> = (props) => {
  return (
    <SuraFetcherContext.Provider
      value={{
        axiosInstance: props.axiosInstance,
        useQueryInstance: props.useQueryInstance,
        paramConfig: props.paramConfig,
        paramInterceptor: props.paramInterceptor,
        singleParamInterceptor: props.singleParamInterceptor,
        methodConfig: props.methodConfig,
      }}
    >
      {props.children}
    </SuraFetcherContext.Provider>
  );
};

export const useSuraFetcherProvider = () => {
  return useContext(SuraFetcherContext) as SuraFetcherContextInterface;
};
