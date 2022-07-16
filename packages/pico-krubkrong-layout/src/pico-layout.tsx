import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PicoDetailPageWrapper } from './components/pico-detail-page-wrapper';
import { MenuLayout } from './components/pico-menu.layout';
import { usePicoConfigLayoutContext } from './pico-layout-config-provider';

export interface KrobkrongPicoLayoutProps {
  /**
   * render route view component
   * @example <RouteView />
   */
  children: ReactNode;
}

export const KrobkrongPicoLayout: FC<KrobkrongPicoLayoutProps> = (props) => {
  const context = usePicoConfigLayoutContext();
  const {
    routeConfig: { MENU_PATH },
  } = usePicoConfigLayoutContext();
  const location = useLocation();

  if (location.pathname === MENU_PATH) {
    return (
      <div>
        <MenuLayout
          layoutName={context?.menuConfig?.layoutName}
          shopName={context?.menuConfig?.shopName}
          userName={context?.menuConfig?.firstNameLastName}
          userRoleName={context?.menuConfig?.userRole}
          version={context?.menuConfig?.appVersion}
        />
      </div>
    );
  } else {
    return (
      <div>
        <PicoDetailPageWrapper>{props.children}</PicoDetailPageWrapper>
      </div>
    );
  }
};
