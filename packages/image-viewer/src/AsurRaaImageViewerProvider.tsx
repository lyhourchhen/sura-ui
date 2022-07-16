import { createContext, FC, ReactNode, useContext } from "react";
import { ConfigProvider } from "react-avatar";
export interface AsurRaaImageViewerContextInterface {
  imageUrl: string;
  fallbackType: "avatar" | "image";
  fallbackImage: string;
  fallbackAvatarProviderProps?: typeof ConfigProvider;
  allowPreview: boolean;
  advanced?: {
    headers: Record<string, string>;
  };
  children?: ReactNode;
}

const AsurRaaImageViewerContext = createContext<
  AsurRaaImageViewerContextInterface | undefined
>(undefined!);

const AsurRaaImageViewerProvider: FC<
  AsurRaaImageViewerContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaImageViewerContext.Provider
      value={{
        fallbackImage: props?.fallbackImage ?? "",
        imageUrl: props?.imageUrl ?? "",
        fallbackType: props?.fallbackType ?? "avatar",
        allowPreview: props?.allowPreview ?? true,
        fallbackAvatarProviderProps: props?.fallbackAvatarProviderProps,
        advanced: props?.advanced,
      }}
    >
      {props?.children}
    </AsurRaaImageViewerContext.Provider>
  );
};

const useGetAsurRaaImageViewer = () => {
  return useContext(AsurRaaImageViewerContext);
};

export {
  AsurRaaImageViewerContext,
  AsurRaaImageViewerProvider,
  useGetAsurRaaImageViewer,
};
