import { createContext, FC, ReactNode, useContext } from "react";

export interface AsurRaaDropdownContextInterface {
  dateFormate: "YYYY-MM-DD" | string;
  children?: ReactNode;
}

const AsurRaaDropdownContext = createContext<
  AsurRaaDropdownContextInterface | undefined
>(undefined);

const AsurRaaDropdownProvider: FC<
  AsurRaaDropdownContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaDropdownContext.Provider
      value={{
        dateFormate: props?.dateFormate ?? "YYYY-MM-DD",
      }}
    >
      {props?.children}
    </AsurRaaDropdownContext.Provider>
  );
};

// * hook
const useGetAsurRaaDropdown = () => {
  return useContext(AsurRaaDropdownContext);
};

export {
  AsurRaaDropdownContext,
  AsurRaaDropdownProvider,
  useGetAsurRaaDropdown,
};
