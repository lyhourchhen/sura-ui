import { createContext, FC, ReactNode, useContext } from "react";

export interface AsurRaaSaleCardContextInterface {
  imageUrl: string;
  fallbackImage: string;
  children?: ReactNode;
}

const AsurRaaSaleCardContext = createContext<
  AsurRaaSaleCardContextInterface | undefined
>(undefined);

const AsurRaaSaleCardProvider: FC<
  AsurRaaSaleCardContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaSaleCardContext.Provider
      value={{
        fallbackImage: props?.fallbackImage ?? "",
        imageUrl: props?.imageUrl ?? "",
      }}
    >
      {props?.children}
    </AsurRaaSaleCardContext.Provider>
  );
};

// * hook
const useGetAsurRaaSaleCard = () => {
  return useContext(AsurRaaSaleCardContext);
};

export {
  AsurRaaSaleCardContext,
  AsurRaaSaleCardProvider,
  useGetAsurRaaSaleCard,
};
