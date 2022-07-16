# Pico Krubkrong Layout

### Example

```tsx
import info from '@krubrkong/package';
import { useGlobalLoading } from '@krubrkong/share-hooks';
import { kPrimaryColor } from '@krubrkong/share-themes';
import { FC, ReactNode } from 'react';
import { AvatarPictureComponent } from '../../components/users-avatar/avatar-picture-component';
import { useAuthStore } from '../../hooks/useUser';
import {
  langKeyArrayData,
  setLangToLocalStorage,
} from '../../locales/i18n.main';
import { ROUTE_PATH } from '../../routers/path.route';
import { useSiderLayout } from '../../routers/sider-layout';
import { useGetUserInfo } from '../../services/users.service';
import {
  KrobkrongPicoLayout,
  KrubkrongPicoLayoutProvider,
  KrubkrongPicoMenuLayoutConfigInterface,
} from '../pico-layout/index';

export const PosMobileLayout: FC<{ children: ReactNode | JSX.Element }> = (
  props
) => {
  const { shopName } = useAuthStore();
  const { data: userData } = useGetUserInfo();
  const { logoutUserFunction: logoutUser } = useAuthStore();
  const { sideMenuMobile } = useSiderLayout();
  const { globalLoading } = useGlobalLoading();

  const menuConfig: KrubkrongPicoMenuLayoutConfigInterface = {
    layoutName: 'Krubkrong',
    shopName: shopName,
    firstNameLastName: `${userData?.firstname} ${userData?.lastname}`,
    userRole: userData?.role,
    avatar: userData?.avatar,
    appVersion: info?.version,
  };

  return (
    <KrubkrongMainPicoLayoutProvider
      layoutConfig={{
        defaultLayout: layoutStoreContext?.mode,
        onChangeLayout: (mode) => {
          const layoutMode: LayoutMode = mode;
          layoutStoreContext.onChangeMode?.(layoutMode);
        },
      }}
    >
      <KrubkrongPicoLayoutProvider
        menuRoutes={sideMenuMobile}
        logoutFunction={logoutUser}
        menuConfig={menuConfig}
        translateConfig={{
          translateData: langKeyArrayData,
          onChangeTranslate: (langKey: string) => {
            setLangToLocalStorage(langKey);
          },
        }}
        routeConfig={{
          LOGIN_PATH: ROUTE_PATH.LOGIN,
          SETTING_PATH: ROUTE_PATH.SETTING,
          MENU_PATH: ROUTE_PATH.MENU,
        }}
        themeConfig={{
          primaryColor: kPrimaryColor,
        }}
        renderAvatarUI={<AvatarPictureComponent />}
        loadingConfig={{ isGlobalLoading: globalLoading }}
      >
        <KrobkrongPicoLayout>{props?.children}</KrobkrongPicoLayout>
      </KrubkrongPicoLayoutProvider>
    </KrubkrongMainPicoLayoutProvider>
  );
};
```
