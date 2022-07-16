// *
// * Hook to use with this Factory (Sura.js)
// * generic <D> use for DTO type while <R> use for Return Type
// *

import type { SuraHttpPath } from "./types";
import { useSuraFetcherProvider } from "./sura-fetcher-provider";
import { SuraServiceWrapperFactory } from "./sura-fetcher.service";
import { GetAllQueryParamInterface } from "./types";
import { getReplaceByContextValue } from "./utils/getReplaceByContextValue";
import { suraSingleServiceWrapperFactory } from "./sura-single-fetcher.service";

export type queryParamFunc = (value: GetAllQueryParamInterface) => string;

export const useSuraFetcherFactory = <D extends unknown, R extends unknown>(
  path: SuraHttpPath
) => {
  const context = useSuraFetcherProvider();
  const config = context?.["paramConfig"];
  const queryInterceptor = context!.paramInterceptor;

  const getFullUrlWithQueryParams: queryParamFunc = ({
    page,
    url,
    limit,
    search,
    param,
  }: GetAllQueryParamInterface): string => {
    const getParam = param === undefined ? "" : `${param}`;
    const getPage =
      page === undefined
        ? `${getReplaceByContextValue(
            config?.pageParamName,
            "page"
          )}=${getReplaceByContextValue(config?.pageDefaultValue, 1)}`
        : `&page=${page}`;
    const getLimit =
      limit === undefined
        ? `${getReplaceByContextValue(
            config?.limitParamName,
            "limit"
          )}=${getReplaceByContextValue(config?.limitDefaultValue, 10)}`
        : `limit=${limit}`;
    const getSearch =
      search === undefined
        ? ""
        : `${getReplaceByContextValue(
            config?.searchParamName,
            "filter"
          )}=${search}`;
    const fullUrl = `${url}?${getLimit}&${getPage}&${getSearch}&${getParam}`;
    return fullUrl;
  };

  return new SuraServiceWrapperFactory<D, R>(
    path,
    context?.axiosInstance!,
    context?.useQueryInstance!,
    getFullUrlWithQueryParams,
    queryInterceptor,
    context?.methodConfig
  );
};

// * single fetcher
export type ParamOption = GetAllQueryParamInterface;
export const useSingleSuraFetcherFactory = <D,>({
  urlRoute: URI,
  paramOption: option,
}: {
  urlRoute: string;
  paramOption?: ParamOption;
}) => {
  const context = useSuraFetcherProvider();
  const config = context?.["paramConfig"];
  const queryInterceptor = context!.paramInterceptor;

  const getFullUrlWithQueryParams: queryParamFunc = ({
    page,
    limit,
    search,
    param,
  }: GetAllQueryParamInterface): string => {
    const getParam = param === undefined ? "" : `${param}`;
    const getPage =
      page === undefined
        ? `${getReplaceByContextValue(
            config?.pageParamName,
            "page"
          )}=${getReplaceByContextValue(config?.pageDefaultValue, 1)}`
        : `&page=${page}`;
    const getLimit =
      limit === undefined
        ? `${getReplaceByContextValue(
            config?.limitParamName,
            "limit"
          )}=${getReplaceByContextValue(config?.limitDefaultValue, 10)}`
        : `limit=${limit}`;
    const getSearch =
      search === undefined
        ? ""
        : `${getReplaceByContextValue(
            config?.searchParamName,
            "filter"
          )}=${search}`;
    const fullUrl = `${URI}?${getLimit}&${getPage}&${getSearch}&${getParam}`;
    return fullUrl;
  };

  return suraSingleServiceWrapperFactory<D>({
    queryInterceptor: queryInterceptor,
    queryParm: getFullUrlWithQueryParams,
    useQueryInstance: context?.useQueryInstance!,
  }).getQuerySingle(option!);
};
