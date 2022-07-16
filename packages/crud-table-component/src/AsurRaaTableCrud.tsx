import { ParamOption, useSuraFetcherFactory } from "@asurraa/sura-ui-fetcher";
import { AsurRaaColumnsProps, AsurRaaTable } from "@asurraa/sura-ui-table";

import { message, Typography } from "antd";
import { MenuItemType } from "rc-menu/es/interface";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface TableCrudComponentProps<T> {
  fetcher: (props: ParamOption) => ReturnType<typeof useSuraFetcherFactory>;
  cbOpenModalState: (value: boolean) => void;
  cbEditableData: (value: T | undefined) => void;
  cbResetFormState: (value: boolean) => void;
  cbSearchStateValue: (value: string) => void;
  renderMoreActionButtonProps?: (props: T | unknown) => MenuItemType[];
  tableColumn: AsurRaaColumnsProps<T>[];
  renderAnotherChildrenOnRightSideProps?: ReactNode | null;
  paramState: string;
  exportParamState?: string;
  exportCSVName?: string;
  detailButtonRoute?: string;
  refreshTableState?: boolean;
  scrollToFirstRowOnChangeState?: boolean;
  hideDeleteButton?: boolean;
  hideEditButton?: boolean;
  hideCreateButton?: boolean;
  hideExportButton?: boolean;
  hideSearch?: boolean;
  hideDetailButton?: boolean;
  hideRefreshButton?: boolean;
}

export const TableCrudComponent = <T,>(props: TableCrudComponentProps<T>) => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const route = useNavigate();
  const { getAll, deleteOne } = props.fetcher({});

  const { meta, isLoading, data, refresh } = getAll({
    param: props.paramState,
    limit: 10,
    page,
  });

  const { originalData: filterAllDataCSV, isLoading: exportLoading } = getAll({
    param: props.exportParamState ? props.exportParamState : props.paramState,
    page: 1,
    limit: 0,
  });

  const exportAllTableData = filterAllDataCSV?.data as any[];

  const column = props.tableColumn as AsurRaaColumnsProps<any>[];

  useEffect(() => {
    refresh();
  }, [props.cbEditableData, refresh]);

  return (
    <Fragment>
      <AsurRaaTable
        pageChange={page}
        antdTableProps={{
          scroll: {
            scrollToFirstRowOnChange: props.scrollToFirstRowOnChangeState,
          },
          loading: isLoading,
          pagination: {
            onChange: (page) => {
              setPage(page);
            },
            total: meta?.totalItems,
            current: page,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total) => (
              <Typography.Text>
                {t("Total")}: {total} {t("items")}
              </Typography.Text>
            ),
          },
        }}
        createButton={
          props.hideCreateButton
            ? undefined
            : {
                onClick: () => {
                  refresh();
                  props.cbEditableData(undefined);
                  props.cbOpenModalState(true);
                  props.cbResetFormState(true);
                },
              }
        }
        refreshButton={
          props.hideRefreshButton
            ? undefined
            : {
                onClick: () => {
                  refresh();
                  message.loading(t("Refreshing") + "...", 0.7);
                },
              }
        }
        deleteActionButton={
          props.hideDeleteButton
            ? undefined
            : (props) => ({
                okText: t("Ok"),
                cancelText: t("Cancel"),
                centered: true,
                onOk: () => {
                  deleteOne({
                    //@ts-ignore
                    id: props.id,
                    currentPage: page,
                  })
                    .then(() => {
                      message.success(t("Deleted"));
                      refresh();
                    })
                    .catch((err) => {
                      message.error(err);
                    });
                },
              })
        }
        editActionButton={
          props.hideEditButton
            ? undefined
            : (data: any) => ({
                onClick: () => {
                  refresh();
                  props.cbEditableData(data);
                  props.cbOpenModalState(true);
                  props.cbResetFormState(true);
                },
              })
        }
        detailActionButton={
          props.hideDetailButton
            ? undefined
            : (propsData) => ({
                onClick: () => {
                  //@ts-ignore
                  route(`${props.detailButtonRoute}/${propsData.id}`);
                },
              })
        }
        renderAnotherChildrenOnRightSide={
          props.renderAnotherChildrenOnRightSideProps
        }
        renderMoreActionButton={props.renderMoreActionButtonProps}
        dataAllCSV={exportAllTableData}
        dataFilterCSV={data}
        CSVFilename={`${t(props.exportCSVName ?? "")}_${new Date().getTime()}`}
        onSearchResult={
          props.hideSearch
            ? undefined
            : (value) => {
                setPage(1);
                props.cbSearchStateValue(value);
              }
        }
        onSearchClearTrigger={
          props.hideSearch
            ? undefined
            : () => {
                setPage(1);
                props.cbSearchStateValue("");
              }
        }
        asurRaaColumnProps={column}
        data={data}
      />
    </Fragment>
  );
};
