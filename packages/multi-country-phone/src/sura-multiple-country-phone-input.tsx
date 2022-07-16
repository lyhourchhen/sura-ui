import { FC, Fragment } from "react";
import en from "world_countries_lists/data/countries/en/world.json";
import { ConfigProvider, CountryPhoneInput, CountryPhoneInputProps } from ".";
import { useGetMultiCountryPhoneInput } from "./sura-multiple-country-phone-input-provider";
import voca from "voca";
import defaultAreas from "./phone-input/sources";
import { CountryPhoneInputValue } from "./phone-input/typings";

export interface SuraMultiCountryPhoneInputProps
  extends Omit<CountryPhoneInputProps, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const getPhraseReturn = (
  value: string
): CountryPhoneInputProps["value"] => {
  const spiltPhone = voca.split(value, " ");
  const countryCode = voca.trim(spiltPhone[0], "+");
  const phone = spiltPhone[1];
  const short = defaultAreas?.find(
    (country) => country.phoneCode === Number(countryCode)
  )?.short;
  return {
    code: Number(countryCode),
    phone: phone,
    short: short,
  };
};

export const SuraMultiCountryPhoneInput: FC<SuraMultiCountryPhoneInputProps> = (
  props
) => {
  const config = useGetMultiCountryPhoneInput();

  const generateValue = (value: string | undefined): CountryPhoneInputValue => {
    return {
      code: getPhraseReturn(value!)?.code,
      phone: getPhraseReturn(value!)?.phone ?? "",
      short: getPhraseReturn(value!)?.short ?? config?.defaultCountry,
    };
  };

  return (
    <ConfigProvider locale={en}>
      <CountryPhoneInput
        style={{ height: 33, marginTop: 0.1 }}
        {...props}
        onChange={(value) => {
          const phoneNumber =
            voca.charAt(value.phone, 0) === "0"
              ? voca.slice(value.phone, 1)
              : value.phone;
          const bindingValue = `+${value.code!}` + " " + phoneNumber;
          props.onChange?.(bindingValue);
        }}
        value={
          props.value === undefined
            ? { short: config?.defaultCountry }
            : generateValue(props.value)
        }
      />
    </ConfigProvider>
  );
};
