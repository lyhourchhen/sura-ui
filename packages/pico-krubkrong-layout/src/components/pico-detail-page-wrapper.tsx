import { Button, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePicoConfigLayoutContext } from '../pico-layout-config-provider';
import { useGetCurrentTimeDate } from './current-time-date';
import { NavigationButton } from './navigation-button';
import { ProfileMenuComponent } from './profile-pico-page-wrapper-dropdown-component';

export const PicoDetailPageWrapper: FC<{
  children: ReactNode;
}> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const currentDateTime = useGetCurrentTimeDate();
  const {
    routeConfig: { MENU_PATH },
  } = usePicoConfigLayoutContext();

  return (
    <div className="relative">
      <div
        className="sticky top-0 z-50"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          padding: '10px',
          boxShadow: ' inset 0px -3px 2px -2px  #bbbb',
        }}
      >
        <div className="flex items-center">
          <Button
            size="large"
            className="mr-2"
            onClick={() => navigate(MENU_PATH)}
            type="primary"
          >
            {t('Menu')}
          </Button>
          {screens.md ? <NavigationButton /> : null}
        </div>
        <div className="flex flex-row items-center">
          <ProfileMenuComponent />
          {screens.md ? (
            <Typography.Text strong>{currentDateTime}</Typography.Text>
          ) : null}
        </div>
      </div>

      <div
        className="min-h-screen"
        style={{
          padding: 20,
          backgroundColor: '#EFF2F5',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
