import { createContext, FC, useContext } from 'react';
import { KrubkrongMainPicoLayoutContextProps } from './interface';

const KrubkrongMainPicoLayoutMainContext = createContext<
  KrubkrongMainPicoLayoutContextProps | undefined
>(undefined);

export const KrubkrongMainPicoLayoutProvider: FC<
  KrubkrongMainPicoLayoutContextProps
> = (props) => {
  return (
    <KrubkrongMainPicoLayoutMainContext.Provider
      value={{
        ...props,
      }}
    >
      {props.children}
    </KrubkrongMainPicoLayoutMainContext.Provider>
  );
};

export const useKrubkrongMainPicoLayoutMainProvider = () => {
  return useContext(
    KrubkrongMainPicoLayoutMainContext
  ) as KrubkrongMainPicoLayoutContextProps;
};
