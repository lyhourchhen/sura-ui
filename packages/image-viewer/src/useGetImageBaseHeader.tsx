import { useGetAsurRaaImageViewer } from "./AsurRaaImageViewerProvider";

export const useGetImageHeader = () => {
  const context = useGetAsurRaaImageViewer();
  const contextImageUrl = context?.imageUrl;

  return async (value: string | undefined) => {
    const imageUrl = `${contextImageUrl}${value}`;
    const src = imageUrl;
    const options = {
      headers: {
        ...context?.advanced?.headers,
      },
    };

    const res = await fetch(src, options);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  };
};
