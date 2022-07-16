export const getReplaceByContextValue = (
  contextValue: string | number | undefined,
  defaultValue: string | number | undefined
) => {
  if (contextValue) {
    return contextValue;
  }
  return defaultValue;
};
