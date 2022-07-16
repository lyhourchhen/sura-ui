import { ButtonProps, ModalFuncProps, TableProps } from "antd";
import { ColumnProps } from "antd/lib/table";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { AsurRaaTableContextInterface } from "./AsurRaaTableProvider";
//* see https://ant.design/components/menu/#Usage-upgrade-after-4.20.0
import { MenuItemType } from "rc-menu/es/interface";
import { ItemType } from "antd/lib/menu/hooks/useItems";

type DataIndexManipulator<T> = T extends T ? keyof T : any;

// @ts-ignore
export interface AsurRaaColumnsProps<T = any> extends ColumnProps<T> {
  dataIndex?: DataIndexManipulator<T>;
  /**
   * Pls use width with px not the raw number
   * @example width: "50px"
   */
  width?: ColumnProps<T>["width"];
}

export type CaslAbilitySubject = unknown;

/**
 * @deprecated
 * pls use AsurRaaColumnsProps instead
 */
// @ts-ignore
export interface AsurRaaColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex?: DataIndexManipulator<T>;
  /**
   * Pls use width with px not the raw number
   * @example width: "50px"
   */
  width?: ColumnProps<T>["width"];
}

export type ActionMenuType = ItemType & {
  icon: ReactNode | JSX.Element;
};

type MenuItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface AsurRaaTableProps<T>
  extends Pick<AsurRaaTableContextInterface, "needRefreshLoading"> {
  antdTableProps?: TableProps<T>;
  createButton?: ButtonProps | undefined;
  hideCreateButton?: boolean;
  hideRefreshButton?: boolean;
  createText?: string;
  refreshButton?: ButtonProps | undefined;
  asurRaaColumnProps: Array<AsurRaaColumnsProps>;
  data: Array<T>;
  dataAllCSV?: Array<any> | undefined;
  CSVFilename?: string | undefined;
  dataFilterCSV?: Array<any> | undefined;
  renderMoreButtonHeader?: JSX.Element | ReactNode;
  noNeedHeader?: boolean;
  customWidthActionColumn?: number;
  renderAnotherChildrenOnRightSide?: ReactNode | JSX.Element;
  noActionColumn?: boolean;
  detailActionText?: string;
  editActionText?: string;
  deleteActionText?: string;
  noViewAs?: boolean;
  abilitySubject?: CaslAbilitySubject;
  noNoColumn?: boolean;
  pageChange?: number;
  csvLoading?: boolean;
  /**
   * @see https://ant.design/components/menu/#Usage-upgrade-after-4.20.0
   */
  renderMoreActionButton?: (props: T) => MenuItemType[];
  detailActionButton?: (props: T) => MenuItemProps | undefined;
  deleteActionButton?: (props: T) => ModalFuncProps | undefined;
  editActionButton?: (props: T) => MenuItemProps | undefined;
  /**
   * When using this props it will automatically render the Search View
   * If you don't want to render it just not pass it in
   * @property
   */
  onSearchResult?: (searchData: any) => void;
  onSearchClearTrigger?: () => void;
  onSearchOnChange?: (searchData: string) => void;
  onChangeFilterDataDate?: (value: Array<string>, momentProps: any) => void;
  /**
   * Render own Search view in the same location the native search
   * @property
   */
  renderOwnSearchView?: ReactNode | JSX.Element;
  /**
   * @deprecated
   */
  adjustColumn?: boolean;
  /**
   * Render own Search view in the same location the native search
   * @default 5%
   */
  adjustNoAndActionColumnWidth?: AsurRaaColumnsProps["width"];
}

/**
 * @deprecated
 * pls don't use this anymore
 */
export interface AsurRaaDynamicTableInterface extends AsurRaaTableProps<any> {
  isDynamicColumnWidth?: boolean;
  rowKey?: string;
  tableHeight?: number;
  maxWidthPerCell?: number;
  dynamicWidthBaseColumn?: keyof AsurRaaColumnsProps;
}
