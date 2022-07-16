import { createContext, FC, ReactNode, useContext } from "react";
import { CountryShortType } from "./phone-input/sources";

export interface SuraMultiCountryPhoneInputInterface {
  defaultCountry: CountryShortType;
  scopeCountry?: CountryShortType[];
  children?: ReactNode | JSX.Element;
}

const SuraMultiCountryPhoneInputContext = createContext<
  SuraMultiCountryPhoneInputInterface | undefined
>({
  defaultCountry: "KH",
});

const SuraMultiCountryPhoneInputProvider: FC<
  SuraMultiCountryPhoneInputInterface
> = (props) => {
  return (
    <SuraMultiCountryPhoneInputContext.Provider
      value={{
        defaultCountry: props.defaultCountry,
        scopeCountry: props.scopeCountry,
      }}
    >
      {props.children}
    </SuraMultiCountryPhoneInputContext.Provider>
  );
};

// * hook
const useGetMultiCountryPhoneInput = () => {
  return useContext(SuraMultiCountryPhoneInputContext);
};

export { SuraMultiCountryPhoneInputProvider, useGetMultiCountryPhoneInput };
