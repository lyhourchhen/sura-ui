import { createContext, FC, ReactNode, useContext } from "react";

export interface AsurRaaPaymentModalContextInterface {
  khrExchangeRate: number;
  children?: ReactNode;
}

const AsurRaaPaymentModalContext = createContext<
  AsurRaaPaymentModalContextInterface | undefined
>(undefined);

const AsurRaaPaymentModalProvider: FC<
  AsurRaaPaymentModalContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaPaymentModalContext.Provider
      value={{
        khrExchangeRate: props?.khrExchangeRate ?? 4000,
      }}
    >
      {props?.children}
    </AsurRaaPaymentModalContext.Provider>
  );
};

// * hook
const useGetAsurRaaPaymentModal = () => {
  return useContext(AsurRaaPaymentModalContext);
};

export {
  AsurRaaPaymentModalContext,
  AsurRaaPaymentModalProvider,
  useGetAsurRaaPaymentModal,
};
