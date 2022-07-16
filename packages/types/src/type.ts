interface FactoryProps {
  create: string;
  edit: string;
  del: string;
  read: string;
}
type MyExclude<T, U> = T extends U ? never : T;

const data: Omit<FactoryProps, "create"> = {
  del: "del",
  edit: "edit",
  read: "read",
};

export type FactoryReturnProps<T extends FactoryProps> = {
  [K in keyof T]: T[K] extends string | undefined ? never : T[K];
};

const factory = <T extends FactoryProps>(
  props: Partial<T>
): FactoryReturnProps<T> => {
  const returnValue = props as FactoryReturnProps<T>;
  return returnValue;
};

const honda = factory({ del: "hi", create: "12" });
