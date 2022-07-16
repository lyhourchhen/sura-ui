import { Select } from "antd";
import moment from "moment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import type { AsurRaaSelectProps } from "@asurraa/sura-ui-select";
import { useGetAsurRaaDropdown } from "./AsurRaaDropdownFilterProvider";

export enum DROPDOWN_FILTER_DATE_ENUM {
  "Today" = "Today",
  "This Week" = "This Week",
  "Last Week" = "Last Week",
  "This Month" = "This Month",
  "Last Month" = "Last Month",
  "30 Days" = "30 Days",
  "This Year" = "This Year",
}

export type AsurRaaFilterOptionType = {
  name: DROPDOWN_FILTER_DATE_ENUM;
  value: {
    startDate: string;
    endDate: string;
  };
};

export interface AsurRaaDropdownFilterProps extends AsurRaaSelectProps {
  //* This should be moment format type
  filterDateFormat?: string;
  filterOnChange?: (value: AsurRaaFilterOptionType | any) => void;
  emitFilterValueFromName?: Array<DROPDOWN_FILTER_DATE_ENUM>;
}

const getFullFilterListOption = (
  current: string,
  dateTimeFormat: string | undefined
): Array<AsurRaaFilterOptionType> => [
  {
    name: DROPDOWN_FILTER_DATE_ENUM["Today"],
    value: {
      endDate: current,
      startDate: current,
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["This Week"],
    value: {
      startDate: moment().startOf("weeks").format(dateTimeFormat),
      endDate: moment().endOf("weeks").format(dateTimeFormat),
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["Last Week"],
    value: {
      startDate: moment()
        .subtract(1, "weeks")
        .startOf("weeks")
        .format(dateTimeFormat),
      endDate: moment()
        .subtract(1, "weeks")
        .endOf("weeks")
        .format(dateTimeFormat),
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["This Month"],
    value: {
      startDate: moment().startOf("months").format(dateTimeFormat),
      endDate: moment().endOf("months").format(dateTimeFormat),
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["Last Month"],
    value: {
      startDate: moment()
        .subtract(1, "month")
        .startOf("months")
        .format(dateTimeFormat),
      endDate: moment()
        .subtract(1, "month")
        .endOf("months")
        .format(dateTimeFormat),
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["30 Days"],
    value: {
      startDate: moment().subtract(30, "days").format(dateTimeFormat),
      endDate: current,
    },
  },
  {
    name: DROPDOWN_FILTER_DATE_ENUM["This Year"],
    value: {
      startDate: moment().startOf("year").format(dateTimeFormat),
      endDate: current,
    },
  },
];

export const AsurRaaDropdownFilter: FC<AsurRaaDropdownFilterProps> = (
  props
) => {
  const { t } = useTranslation();
  const global = useGetAsurRaaDropdown();
  const dateTimeFormat =
    props.filterDateFormat === undefined
      ? global?.dateFormate
      : props.filterDateFormat;
  const current = moment().format(dateTimeFormat);

  const fullFilterListOption = getFullFilterListOption(current, dateTimeFormat);

  const emitFilterListOption: Array<AsurRaaFilterOptionType> =
    fullFilterListOption.filter(
      (option) => !props?.emitFilterValueFromName?.includes(option.name)
    );

  const filterListOption: Array<AsurRaaFilterOptionType> =
    props.emitFilterValueFromName === undefined
      ? fullFilterListOption
      : emitFilterListOption;

  return (
    <Select
      showSearch={false}
      allowClear={false}
      defaultValue={filterListOption[0].name}
      onSelect={(value: string) => {
        props?.filterOnChange?.({
          name: value,
          value: filterListOption.find((option) => option.name === value)
            ?.value,
        });
      }}
      {...props}
      style={{ width: 130 }}
    >
      {filterListOption.map((filter, index) => (
        <Select.Option key={index} value={filter.name}>
          {t(filter.name)}
        </Select.Option>
      ))}
    </Select>
  );
};
