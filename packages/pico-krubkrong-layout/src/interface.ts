import { ReactNode } from 'react';
//* see https://ant.design/components/menu/#Usage-upgrade-after-4.20.0
import { MenuItemType } from 'rc-menu/es/interface';

export interface LangKeyInterface {
  name: string;
  key: string;
  message: string;
}

export type ReactChildren = {
  children: ReactNode | JSX.Element;
};

export interface KrubkrongPicoMenuLayoutConfigInterface {
  layoutName: string;
  shopName: string;
  firstNameLastName: string;
  userRole: string;
  avatar: string;
  appVersion: string;
}

export interface PicoLayoutRouteConfigInterface {
  SETTING_PATH: string;
  LOGIN_PATH: string;
  MENU_PATH: string;
}

export interface LayoutConfigInterface {
  defaultLayout: string;
  onChangeLayout: (mode: string) => void;
}

export interface TranslateConfigInterface {
  translateData: LangKeyInterface[];
  onChangeTranslate?: (langKey: string) => void;
}

export interface ThemeConfigInterface {
  primaryColor: string;
}

export interface LoadingConfigInterface {
  isGlobalLoading: boolean;
}

// * pico menu interface
export interface PicoMenuProps {
  name: string;
  icon: ReactNode;
  path: string;
  description: string;
}

// * main interface
export interface KrubkrongPicoLayoutContextProps extends ReactChildren {
  menuConfig: KrubkrongPicoMenuLayoutConfigInterface;
  translateConfig: TranslateConfigInterface;
  routeConfig: PicoLayoutRouteConfigInterface;
  renderAvatarUI?: ReactNode;
  menuRoutes: Array<PicoMenuProps>;
  themeConfig: ThemeConfigInterface;
  loadingConfig: LoadingConfigInterface;
  logoutFunction: () => void;
}

export interface KrubkrongMainPicoLayoutContextProps extends ReactChildren {
  layoutConfig: LayoutConfigInterface;
}

export type MenuItemsProps = MenuItemType & {
  icon?: ReactNode | JSX.Element;
};
