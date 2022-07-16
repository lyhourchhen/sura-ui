import {
  GetAllQueryParamInterface,
  GetAllResponseInterface,
  TheUseQueryInstance,
} from "./types";
import { MetaSuraPagination, QueryInterceptor } from "./sura-fetcher.service";
import { queryParamFunc } from "./hooks";

type GetSingleQueryParamInterface = {
  queryParm: queryParamFunc | undefined;
  useQueryInstance: TheUseQueryInstance;
  queryInterceptor: QueryInterceptor;
};

export const suraSingleServiceWrapperFactory = <R>({
  queryParm,
  useQueryInstance,
  queryInterceptor,
}: GetSingleQueryParamInterface) => {
  const getQuerySingle = (restProps: GetAllQueryParamInterface) => {
    const fullUriPath = queryParm?.(restProps);
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = useQueryInstance<GetAllResponseInterface<R, MetaSuraPagination>, any>(
      // @ts-ignore
      fullUriPath
    );

    // @ts-ignore
    const meta: typeof response.meta = queryInterceptor.meta(response);
    // @ts-ignore
    const data: R = queryInterceptor.data(response);
    return {
      meta,
      data,
      originalData: response,
      error,
      isLoading,
      refresh: refetch,
      url: fullUriPath,
      ...rest,
    };
  };

  return { getQuerySingle };
};
