import { LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePicoConfigLayoutContext } from '../pico-layout-config-provider';

import { uid } from 'uid';
import { MenuItemsProps } from 'src/interface';

export const ProfileMenuDropdown = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    routeConfig: { LOGIN_PATH, SETTING_PATH },
    logoutFunction,
  } = usePicoConfigLayoutContext();

  const menuItems: MenuItemsProps[] = [
    {
      label: t('Profile'),
      onClick: () => navigate(SETTING_PATH),
      key: uid(),
    },
    {
      label: t('Logout'),
      key: uid(),
      icon: <LogoutOutlined />,
      onClick: () => {
        logoutFunction();
        navigate(LOGIN_PATH);
      },
    },
  ];

  return <Menu items={menuItems} />;
};
