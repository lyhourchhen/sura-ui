import { createContext, FC, Fragment, ReactNode, useContext } from "react";
import { ConfigProvider } from "antd";
import en_US from "antd/lib/locale/en_US";
export interface AsurRaaTableContextInterface {
  children: ReactNode;
  caslAppAbility?: any;
  /**
   * @example "YYYY-MM-DD"
   */
  formateDate: "YYYY-MM-DD" | string;
  overallTitleConfig?: {
    createButton: string;
    refreshButton: string;
    editButton: string;
    deleteButton: string;
    exportCSVButton: string;
  };
  needRefreshLoading?: boolean;
}

export type OverallTitleConfig =
  AsurRaaTableContextInterface["overallTitleConfig"];

const AsurRaaTableContext = createContext<
  AsurRaaTableContextInterface | undefined
>(undefined);

const AsurRaaTableProvider: FC<AsurRaaTableContextInterface> = (props) => {
  return (
    <Fragment>
      <ConfigProvider locale={en_US}>
        <AsurRaaTableContext.Provider
          value={{
            caslAppAbility: props.caslAppAbility,
            children: props.children,
            formateDate: props.formateDate,
            overallTitleConfig: props.overallTitleConfig,
          }}
        >
          {props.children}
        </AsurRaaTableContext.Provider>
      </ConfigProvider>
    </Fragment>
  );
};

// * hook
const useGetConfigAsurRaaTable = () => {
  return useContext(AsurRaaTableContext);
};

export {
  AsurRaaTableProvider,
  useGetConfigAsurRaaTable as useGetConfigAsurRaaTableApi,
};
