import { Input } from "antd";
import { GroupProps, InputProps } from "antd/es/input";
import AreaSelect, { AreaSelectProps } from "./area-select";
import { CountryPhoneInputValue } from "./typings";
import { usePhoneInput } from "./shared";

export interface CountryPhoneInputProps
  extends Omit<InputProps, "defaultValue" | "value" | "onChange"> {
  defaultValue?: CountryPhoneInputValue;
  value?: CountryPhoneInputValue;
  onChange?: (value: CountryPhoneInputValue) => void;
  selectProps?: AreaSelectProps;
  inputGroupProps?: GroupProps;
  inline?: boolean;
  className?: string;
  disabled?: boolean;
}

export const CountryPhoneInput = ({
  defaultValue,
  onChange,
  selectProps = {},
  inputGroupProps,
  inline,
  className,
  disabled,
  ...inputProps
}: CountryPhoneInputProps) => {
  const isControlled = "value" in inputProps;
  const { value } = inputProps;

  const { area, handleAreaChange, handlePhoneChange } = usePhoneInput({
    isControlled,
    defaultValue,
    value,
    onChange,
  });

  const commonProps = { disabled };

  const areaSelect = (
    <AreaSelect
      {...commonProps}
      {...selectProps}
      value={area?.short}
      onChange={handleAreaChange}
      defaultValue={defaultValue?.short}
    />
  );

  if (inline) {
    inputProps.addonBefore = areaSelect;
  } else {
    inputProps.prefix = areaSelect;
  }

  return (
    <Input
      type={"number"}
      {...commonProps}
      {...inputProps}
      className={
        "antd-country-phone-input" + (className ? ` ${className}` : "")
      }
      value={value?.phone}
      onChange={handlePhoneChange}
      defaultValue={defaultValue?.phone}
    />
  );
};
