import React, { FC } from "react";
import { AsurRaaTable } from "./AsurRaaTable";
import { calculateColumnsWidthHelperFun } from "./helper/DynamicColumnsHelper";
import { AsurRaaDynamicTableInterface } from "./interface";

/**
 *
 * @deprecated
 * pls don't use this anymore
 */
export const AsurRaaDynamicTable: FC<AsurRaaDynamicTableInterface> = (
  props
) => {
  const generateDataTable = calculateColumnsWidthHelperFun({
    columns: props.asurRaaColumnProps,
    source: props.data,
    maxWidthPerCell: props.maxWidthPerCell,
    selectDynamicBase: props.dynamicWidthBaseColumn,
  });

  const columnMerge = generateDataTable.columns?.map((column, index) => {
    return {
      ...column,
      ...props.asurRaaColumnProps[index],
    };
  });

  return (
    <AsurRaaTable
      noNeedHeader={true}
      noActionColumn={true}
      antdTableProps={{
        rowKey: props.rowKey,
        scroll: { x: generateDataTable.tableWidth, y: props.tableHeight },
        ...props.antdTableProps,
      }}
      {...props}
      data={generateDataTable.source}
      asurRaaColumnProps={columnMerge}
    />
  );
};

AsurRaaDynamicTable.defaultProps = {
  maxWidthPerCell: 600,
  tableHeight: 500,
  rowKey: "id",
};
