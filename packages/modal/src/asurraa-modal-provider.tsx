import { DraggableModalProvider } from "ant-design-draggable-modal";
import { createContext, FC, ReactNode, useContext } from "react";
import { AsurRaaModalProps } from "./asurraa-modal";

export interface AsurRaaDraggableModalConfig
  extends Pick<AsurRaaModalProps, "modalType"> {
  overwriteText?: {
    cancelText?: string;
    okText?: string;
  };
  children?: ReactNode;
}

const AsurRaaDraggableModalContext = createContext<
  AsurRaaDraggableModalConfig | undefined
>(undefined);

export const AsurRaaDraggableModalProvider: FC<AsurRaaDraggableModalConfig> = (
  props
) => {
  return (
    <DraggableModalProvider>
      <AsurRaaDraggableModalContext.Provider
        value={{
          modalType: props.modalType,
          overwriteText: props.overwriteText,
        }}
      >
        {props.children}
      </AsurRaaDraggableModalContext.Provider>
    </DraggableModalProvider>
  );
};

export const useAsurRaaDraggableModalConfig = () => {
  return useContext(AsurRaaDraggableModalContext);
};
