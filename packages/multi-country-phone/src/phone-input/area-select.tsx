import { Select } from "antd";
import { OptionProps, SelectProps } from "antd/es/select";
import { useContext } from "react";
import { useGetMultiCountryPhoneInput } from "../sura-multiple-country-phone-input-provider";
import { configContext } from "./config";
import { filterOption, filterSort } from "./shared";

export interface AreaSelectProps extends SelectProps<any> {
  optionProps?: OptionProps;
  defaultValue?: string;
}

export const AreaSelect = ({
  optionProps,
  defaultValue,
  ...selectProps
}: AreaSelectProps) => {
  const { areas } = useContext(configContext);
  const config = useGetMultiCountryPhoneInput();

  const filterAreas = () => {
    if (config?.scopeCountry) {
      return areas.filter((value) => {
        const scopeArea = config?.scopeCountry?.find(
          (item) => item === value.short
        );
        return scopeArea === value.short;
      });
    } else {
      return areas;
    }
  };

  return (
    <span
      onMouseUp={(e) => {
        // workaround for this: https://github.com/ant-design/ant-design/commit/ed1959c13e938a2f1d71c315bc79cb621853ec8f
        e.stopPropagation();
      }}
    >
      <Select
        showArrow
        showSearch
        bordered={false}
        dropdownMatchSelectWidth={false}
        optionLabelProp="label"
        filterOption={filterOption}
        filterSort={filterSort}
        {...selectProps}
        value={selectProps.value || defaultValue}
      >
        {filterAreas().map((item) => {
          const key = `${item.name} ${item.phoneCode}`;
          const fixedProps = {
            key,
            value: item.short,
            label: (
              <>
                {item.emoji} +{item.phoneCode}
              </>
            ),
          };
          return (
            <Select.Option {...optionProps} {...fixedProps}>
              {item.emoji} {key}
            </Select.Option>
          );
        })}
      </Select>
    </span>
  );
};

export default AreaSelect;
