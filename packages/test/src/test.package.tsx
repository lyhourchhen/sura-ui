import React, { FC } from "react";

export interface SuraTestPackageProps {}

export const SuraTestPackage: FC<SuraTestPackageProps> = () => {
  const [number, setNumber] = React.useState(0);
  return (
    <div>
      <h1>122222622</h1>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  );
};
