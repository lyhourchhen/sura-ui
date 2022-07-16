import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  InsertRowLeftOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Menu,
  message,
  Modal,
  Popover,
  Table,
  Tag,
  Typography,
  Input,
  TableProps,
} from "antd";
import Bowser from "bowser";
import moment from "moment";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { uid } from "uid";
import { useGetConfigAsurRaaTableApi } from "./AsurRaaTableProvider";
import { Flexbox, PaddingWrapper } from "./components/common";
import { useSize } from "ahooks";
import {
  ActionMenuType,
  AsurRaaColumnsProps,
  AsurRaaTableProps,
} from "./interface";

const { Search } = Input;
// * main
export const AsurRaaTable = <T,>(props: AsurRaaTableProps<T>) => {
  const context = useGetConfigAsurRaaTableApi();
  const titleConfig = context?.overallTitleConfig;
  const ability = context?.caslAppAbility;

  const ref = useRef(null);
  // const { width } = useSize(ref);

  const [isLoadingRefreshLocalState, setIsLoadingRefreshLocalState] = useState<
    boolean | undefined
  >(true);

  useEffect(() => {
    if (props.needRefreshLoading) {
      setIsLoadingRefreshLocalState(props.needRefreshLoading);
    } else {
      setIsLoadingRefreshLocalState(context?.needRefreshLoading);
    }
  }, [context?.needRefreshLoading, props.needRefreshLoading]);

  const dateAsurRaaFormatOnlyDateNotWithTime =
    context?.formateDate ?? "YYYY-MM-DD";

  const isAbilityUndefined = (
    ability: boolean | undefined,
    reactValue: ReactNode
  ) => {
    if (ability === undefined) {
      return reactValue;
    } else {
      return ability ? reactValue : null;
    }
  };

  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<any>();

  const [stateValueForFilter, setStateValueForFilter] = useState<any>([
    moment(
      `${moment().subtract(7, "days").format("YYYY-MM-DD")}`,
      dateAsurRaaFormatOnlyDateNotWithTime
    ),
    moment(
      `${moment().format("YYYY-MM-DD")}`,
      dateAsurRaaFormatOnlyDateNotWithTime
    ),
  ]);
  const [stateOnChangeValueSearch, setStateOnChangeValueSearch] =
    useState<string>();
  const [autoFocusOnSearch, setAutoFocusOnSearch] = useState<boolean>(false);

  useEffect(() => {
    const dataSourceWithKey = props?.data?.map((item: any) => {
      const generateKey = item["key"] === undefined ? uid() : item["key"];
      return {
        ...item,
        key: generateKey,
      };
    });
    setDataSource(dataSourceWithKey);
  }, [props.data, props.refreshButton]);

  const deleteModal = (properties: T) => {
    Modal.confirm({
      title: t("Confirm"),
      icon: <ExclamationCircleOutlined />,
      okText: t("Sure"),
      cancelText: t("Dismiss"),
      ...props?.deleteActionButton?.(properties),
    });
  };

  const menu = (properties: T) => {
    const moreMenu = props.renderMoreActionButton?.(properties) ?? [];
    // @ts-ignore
    const detailMenu: ActionMenuType[] =
      props.detailActionButton === undefined
        ? []
        : [
            {
              key: uid(),
              icon: <EyeOutlined />,

              label: (
                <div>
                  {props.detailActionText === undefined
                    ? t("Detail")
                    : t(props.detailActionText ?? "")}
                </div>
              ),
              onClick: props.detailActionButton(properties)?.onClick,
            },
          ];
    // @ts-ignore
    const editMenu: ActionMenuType[] =
      props.editActionButton === undefined
        ? []
        : [
            {
              key: uid(),
              icon: <EditOutlined />,
              label: (
                <div>
                  {props.editActionText === undefined
                    ? t("Edit")
                    : t(props.editActionText ?? "")}
                </div>
              ),
              onClick: props.editActionButton(properties)?.onClick,
            },
          ];
    const deleteMenu: ActionMenuType[] =
      props.deleteActionButton === undefined
        ? []
        : [
            {
              key: uid(),
              icon: <DeleteOutlined />,
              label: (
                <div>
                  {props.deleteActionText === undefined
                    ? t("Delete")
                    : t(props.deleteActionText ?? "")}
                </div>
              ),
              onClick: () => {
                deleteModal(properties);
              },
            },
          ];
    return (
      // @ts-ignore
      <Menu items={[...moreMenu, ...detailMenu, ...editMenu, ...deleteMenu]} />
    );
  };

  const isSafari =
    Bowser.getParser(window.navigator.userAgent).getBrowserName() === "Safari";

  const generateDynamicWidthForSafari = () => {
    if (props.asurRaaColumnProps.length <= 3) {
      return "5%";
    } else if (props.asurRaaColumnProps.length <= 6) {
      return "3%";
    } else {
      return "2%";
    }
  };

  const actionColumnObj: AsurRaaColumnsProps<T> = {
    title: t("Action"),
    key: "action",
    fixed: "right",
    align: "center",
    width:
      props.customWidthActionColumn === undefined
        ? props.adjustNoAndActionColumnWidth
          ? props.adjustNoAndActionColumnWidth
          : isSafari
          ? generateDynamicWidthForSafari()
          : "5%"
        : props.customWidthActionColumn,
    ellipsis: true,
    render: (props) => {
      return (
        <Dropdown overlay={menu(props)} trigger={["click"]}>
          <Button>
            <DownOutlined />
          </Button>
        </Dropdown>
      );
    },
  };
  const NOColumnObj: AsurRaaColumnsProps<T> = {
    title: t("N.O"),
    key: "no",
    fixed: "left",
    align: "center",
    width: props.adjustNoAndActionColumnWidth
      ? props.adjustNoAndActionColumnWidth
      : isSafari
      ? generateDynamicWidthForSafari()
      : "5%",
    ellipsis: true,
    render: (__, _, index) => {
      const calculatePage = (index: number) => {
        if (props.pageChange === 1 || props.pageChange === undefined) {
          return index + 1;
        } else {
          return (props.pageChange - 1) * 10 + index + 1;
        }
      };
      return <Typography.Text>{calculatePage(index)}</Typography.Text>;
    },
  };

  const columnsWithAction: Array<AsurRaaColumnsProps<T>> = [
    NOColumnObj,
    ...props.asurRaaColumnProps,
    actionColumnObj,
  ];
  const columnsNoAction: Array<AsurRaaColumnsProps<T>> = [
    NOColumnObj,
    ...props.asurRaaColumnProps,
  ];

  const mergeColumns = props.noActionColumn
    ? columnsNoAction
    : columnsWithAction;

  const mergeColumnsWithKey = mergeColumns.map((data, index) => {
    return {
      ...data,
      key: index,
    };
  });

  /**
   *  * Where we adjust column function
   */
  const columnWithAdjustments = () => {
    return mergeColumnsWithKey?.map((column) => {
      return {
        // * override the empty value with empty tags
        render: (value: any) => {
          if (value) {
            return value;
          } else {
            return <Tag></Tag>;
          }
        },
        ...column,
      };
    });
  };

  const CustomDataPicker = (
    // @ts-ignore
    <DatePicker.RangePicker
      // @ts-ignore
      onChange={(value: moment.MomentInput[]) => {
        const formatStartDate = moment(value?.[0]).format(
          dateAsurRaaFormatOnlyDateNotWithTime
        );
        const formatEndDate = moment(value?.[1]).format(
          dateAsurRaaFormatOnlyDateNotWithTime
        );
        const formatDate = [formatStartDate, formatEndDate];
        props?.onChangeFilterDataDate?.(formatDate, value);
        setStateValueForFilter([
          moment(`${formatStartDate}`, dateAsurRaaFormatOnlyDateNotWithTime),
          moment(`${formatEndDate}`, dateAsurRaaFormatOnlyDateNotWithTime),
        ]);
      }}
      // @ts-ignore
      defaultValue={stateValueForFilter}
      allowClear={false}
      style={{ marginRight: 20 }}
    />
  );

  const ShowCSVComponent = () => {
    const csvPopover = (
      <Popover
        placement="bottom"
        content={
          <div>
            {props.dataAllCSV !== undefined ? (
              <div>
                {/*
                // ? react18
 // @ts-ignore */}
                <CSVLink
                  data={props?.dataAllCSV}
                  filename={
                    props.CSVFilename
                      ? `${props.CSVFilename}.csv`
                      : "all-data.csv"
                  }
                >
                  <a>All Data</a>
                </CSVLink>
              </div>
            ) : null}
            {props.dataFilterCSV !== undefined ? (
              <div>
                {/*
                // ? react18
 // @ts-ignore */}
                <CSVLink
                  data={props?.dataFilterCSV}
                  filename={"filtered-data.csv"}
                >
                  <br />
                  <a>Filtered Data</a>
                </CSVLink>
              </div>
            ) : null}
          </div>
        }
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Export CSV</div>
          </div>
        }
        trigger="click"
      >
        <Button loading={props?.csvLoading} style={{ marginRight: 20 }}>
          {t(context?.overallTitleConfig?.exportCSVButton ?? "export CSV")}
        </Button>
      </Popover>
    );
    return (
      <div>
        {props?.csvLoading
          ? csvPopover
          : props.dataAllCSV !== undefined || props.dataFilterCSV !== undefined
          ? csvPopover
          : null}
      </div>
    );
  };

  const ComponentHeader = (): JSX.Element => {
    return (
      <PaddingWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              {isAbilityUndefined(
                ability?.can("read", props.abilitySubject ?? ""),
                <div>
                  {props.hideCreateButton ? null : props.createButton !==
                    undefined ? (
                    <Button
                      {...props.createButton}
                      style={{ marginRight: 20 }}
                      type="primary"
                    >
                      <PlusCircleOutlined />
                      {props.createText
                        ? t(props.createText)
                        : t(titleConfig?.createButton ?? t("Add"))}
                    </Button>
                  ) : null}
                </div>
              )}

              {props.hideRefreshButton ? null : props.refreshButton !==
                undefined ? (
                <Button
                  onClick={(e) => {
                    props?.refreshButton?.onClick?.(e);
                    if (isLoadingRefreshLocalState) {
                      message.loading(t("Loading"), 1);
                    }
                  }}
                  {...props.refreshButton}
                >
                  {t(titleConfig?.refreshButton ?? t("Refresh"))}
                </Button>
              ) : null}
            </div>
            <div>
              {props?.renderMoreButtonHeader === undefined
                ? null
                : props?.renderMoreButtonHeader}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {props.adjustColumn === undefined ? null : (
              <div style={{ marginRight: 20 }}>
                <Popover
                  content={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* <Checkbox.Group
                      onChange={(value) => {
                        // console.log("checkbox", value);
                      }}
                      // @ts-ignore
                      options={columnOfAdjustment}
                      // @ts-ignore
                      value={columnOfAdjustment.map((item) => {
                        // @ts-ignore
                        return item.value;
                      })}
                    /> */}
                    </div>
                  }
                  title="Column"
                  trigger="click"
                >
                  <Button type="dashed">
                    <InsertRowLeftOutlined />
                  </Button>
                </Popover>
              </div>
            )}
            {props.renderAnotherChildrenOnRightSide === undefined ? null : (
              <div style={{ marginRight: 20 }}>
                {props.renderAnotherChildrenOnRightSide}
              </div>
            )}

            {props.onChangeFilterDataDate !== undefined && CustomDataPicker}
            <ShowCSVComponent />

            {props.renderOwnSearchView !== undefined ? (
              <div>{props.renderOwnSearchView}</div>
            ) : props.onSearchResult !== undefined ||
              props.onSearchResult === true ? (
              <div style={{ display: "flex" }}>
                <Search
                  defaultValue={stateOnChangeValueSearch}
                  placeholder={t("Search")}
                  onBlur={() => {
                    setAutoFocusOnSearch(false);
                  }}
                  autoFocus={autoFocusOnSearch}
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    props.onSearchOnChange?.(searchValue);
                    if (searchValue.length === 0) {
                      setStateOnChangeValueSearch("");
                      setAutoFocusOnSearch(true);
                      props?.onSearchClearTrigger?.();
                    }
                  }}
                  onSearch={(searchValue) => {
                    setStateOnChangeValueSearch(searchValue);
                    setAutoFocusOnSearch(true);
                    props?.onSearchResult?.(searchValue);
                  }}
                  style={{ width: 200 }}
                />
                <div>
                  {props.onSearchClearTrigger === undefined ? null : (
                    <Button
                      style={{ width: 10, marginLeft: "-2px" }}
                      onClick={() => {
                        setStateOnChangeValueSearch("");
                        setAutoFocusOnSearch(false);
                        props?.onSearchClearTrigger?.();
                      }}
                    >
                      <Flexbox>
                        <CloseOutlined />
                      </Flexbox>
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </PaddingWrapper>
    );
  };

  // * Main Table
  const TableView = (): JSX.Element => {
    return (
      <div>
        <Table
          ref={ref}
          // @ts-ignore
          columns={columnWithAdjustments()}
          dataSource={dataSource}
          scroll={{ x: 1200 }}
          {...props.antdTableProps}
          pagination={{
            ...props.antdTableProps?.pagination,
            showTotal: (total) => {
              return (
                <p>
                  {t("Total")}: {total} {t("items")}
                </p>
              );
            },
          }}
          loading={{
            // @ts-ignore // default={false}
            spinning: props.antdTableProps?.loading ?? false,
            indicator: (
              <Flexbox>
                <LoadingOutlined
                  style={{
                    fontSize: 30,
                  }}
                  spin
                />
              </Flexbox>
            ),
          }}
        />
      </div>
    );
  };

  return (
    <div>
      {isAbilityUndefined(
        ability?.can("read", props.abilitySubject ?? ""),
        <div>
          <ComponentHeader />
          <TableView />
        </div>
      )}
    </div>
  );
};
