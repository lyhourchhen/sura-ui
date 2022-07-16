/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosInstance, AxiosRequestConfig } from "axios";
import type { GetOneInputInterface, SuraHttpPath, HttpResponse } from "./types";
import { queryParamFunc } from "./hooks";
import type {
  CreateInterface,
  DeleteInterface,
  GetAllQueryParamInterface,
  GetAllResponseInterface,
  GetOneInterface,
  GetOneResponseInterface,
  UpdateInterface,
  TheUseQueryInstance,
} from "./types";
import { SuraFetcherContextInterface } from "src";
import { MethodConfig } from "./sura-fetcher-provider";

export interface MetaSuraPagination {}
export type QueryInterceptor = SuraFetcherContextInterface["paramInterceptor"];

// export interface SuraFetcherServiceInterface {
//   getAll<T>(): T;
//   getOne<T>(input: GetOneInputInterface): T;
//   updateOne<T>(input: CreateInterface): T;
//   createOne<T>(input: UpdateInterface): T;
//   deleteOne<T>(input: DeleteInterface): T;
// }

export class SuraServiceWrapperFactory<D, R> {
  // implements SuraFetcherServiceInterface
  private path: SuraHttpPath;
  private getAllUrl: string;
  private theAxiosInstance: AxiosInstance;
  private useQueryInstance: TheUseQueryInstance;
  private queryParm: queryParamFunc;
  private queryInterceptor: QueryInterceptor;
  private methodConfig: MethodConfig | undefined;

  constructor(
    path: SuraHttpPath,
    axios: AxiosInstance,
    useQueryInstance: TheUseQueryInstance,
    queryParm: queryParamFunc,
    queryInterceptor: QueryInterceptor,
    methodConfig?: MethodConfig
  ) {
    this.path = path;
    this.getAllUrl = queryParm({ url: path.GET_ALL });
    this.theAxiosInstance = axios;
    this.useQueryInstance = useQueryInstance;
    this.queryParm = queryParm;
    this.queryInterceptor = queryInterceptor;
    this.methodConfig = methodConfig;
  }

  getAll = ({ page, limit, search, param }: GetAllQueryParamInterface) => {
    if (!this.path.GET_ALL) {
      throw "uri path provided";
    }
    this.getAllUrl = this.queryParm({
      url: this.path.GET_ALL,
      page,
      limit,
      search,
      param,
    });
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<
      GetAllResponseInterface<R, MetaSuraPagination>,
      any
    >(this.getAllUrl);
    // @ts-ignore
    const meta: typeof response.meta = this.queryInterceptor.meta(response);
    // @ts-ignore
    const data: Array<R> | [] = this.queryInterceptor.data(response) ?? [];

    return {
      meta,
      data,
      originalData: response,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  getOne = ({ id }: GetOneInterface) => {
    const {
      data: response,
      error,
      isLoading,
      refetch,
      ...rest
    } = this.useQueryInstance<GetOneResponseInterface<R>, any>(
      `${this.path.GET_ONE}/${id}`
    );
    // @ts-ignore
    const data: R | undefined = this.queryInterceptor.data(response);
    return {
      data,
      originalData: response,
      error,
      isLoading,
      refresh: refetch,
      url: this.getAllUrl,
      ...rest,
    };
  };

  updateOne = async <D>({
    data,
    currentPage,
    id,
  }: UpdateInterface<D>): Promise<HttpResponse<D>> => {
    try {
      const config: AxiosRequestConfig = {
        method: this.methodConfig?.update ?? "patch",
        url: `${this.path.UPDATE}/${id}`,
        data: data,
      };

      const res = await this.theAxiosInstance(config);
      const getAllUrl = this.queryParm({
        url: this.path.GET_ALL,
        page: currentPage,
      });
      return { data: res.data, getAllUrl };
    } catch (error) {
      return { error };
    }
  };

  createOne = async <D>({
    data,
    currentPage,
  }: CreateInterface<D>): Promise<HttpResponse<D>> => {
    if (!this.path.CREATE) {
      throw "uri path provided";
    }
    this.queryParm({
      url: this.path.GET_ALL,
      page: currentPage,
    });
    return await this.theAxiosInstance.post(this.path.CREATE, data);
  };

  deleteOne = async ({
    id,
    currentPage,
  }: DeleteInterface): Promise<HttpResponse<D>> => {
    if (!this.path.DELETE) {
      throw "uri path provided";
    }
    this.queryParm({
      url: this.path.GET_ALL,
      page: currentPage,
    });
    return this.theAxiosInstance.delete(`${this.path.DELETE}/${id}`);
  };

  /**
   *
   * @deprecated
   */
  getAllPromise = async () => {
    if (!this.path.GET_ALL) {
      throw "uri path provided";
    }
    return await this.theAxiosInstance.get<R[]>(`${this.path.GET_ALL}`);
  };

  /**
   *
   * @deprecated
   *
   */
  getOnePromise = async ({ id }: GetOneInputInterface) => {
    if (!this.path.GET_ONE) {
      throw "uri path provided";
    }
    return await this.theAxiosInstance.get<R>(`${this.path.GET_ONE}/${id}`);
  };
}
