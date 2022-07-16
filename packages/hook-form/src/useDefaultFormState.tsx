// * closure hook return default value or not
export const useDefaultFormState = <T extends {}>(value: T | undefined) => {
  return (keyValue: keyof T) => {
    return value?.[keyValue];
  };
};
