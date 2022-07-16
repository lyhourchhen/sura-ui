import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { createContext, FC, useContext } from 'react';
import { KrubkrongPicoLayoutContextProps } from './interface';

const PicoConfigLayoutContext = createContext<
  KrubkrongPicoLayoutContextProps | undefined
>(undefined);

export const KrubkrongConfigPicoLayoutProvider: FC<
  KrubkrongPicoLayoutContextProps
> = (props) => {
  const defaultAvatar = props?.renderAvatarUI ? (
    props.renderAvatarUI
  ) : (
    <div>
      <Avatar size={32} icon={<UserOutlined />} />
    </div>
  );

  return (
    <PicoConfigLayoutContext.Provider
      value={{
        renderAvatarUI: defaultAvatar,
        ...props,
      }}
    >
      {props.children}
    </PicoConfigLayoutContext.Provider>
  );
};

export const usePicoConfigLayoutContext = () => {
  return useContext(PicoConfigLayoutContext) as KrubkrongPicoLayoutContextProps;
};
