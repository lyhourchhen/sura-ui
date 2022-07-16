import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PaddingHeader } from './common';
import { usePicoConfigLayoutContext } from '../pico-layout-config-provider';
import { useTranslation } from 'react-i18next';
import { useKrubkrongMainPicoLayoutMainProvider } from '../pico-layout-provider';
import { MenuItemsProps } from 'src/interface';
import { uid } from 'uid';
import { FC } from 'react';

export const /* A component that is used to render the profile menu <Dropdown/>. */
  ProfileMenuComponent: FC = () => {
    const {
      renderAvatarUI,
      logoutFunction,
      routeConfig: { SETTING_PATH, LOGIN_PATH },
    } = usePicoConfigLayoutContext();
    const picoLayoutContext = usePicoConfigLayoutContext();
    const navigate = useNavigate();

    const {
      layoutConfig: { onChangeLayout },
    } = useKrubkrongMainPicoLayoutMainProvider();

    const { t } = useTranslation();

    const profileMenu = () => {
      const profileMenuItems: MenuItemsProps[] = [
        {
          label: (
            <Radio.Group
              size={'small'}
              options={[
                { label: 'Mobile', value: 'Mobile' },
                { label: 'Desktop', value: 'Desktop' },
              ]}
              defaultValue={'Mobile'}
              onChange={(e) => {
                const value = e.target.value;
                onChangeLayout(value);
              }}
              optionType="button"
              buttonStyle="solid"
            />
          ),
          key: uid(),
        },
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
      return <Menu items={profileMenuItems} />;
    };

    return (
      <Dropdown overlay={profileMenu()} arrow>
        <div style={{ cursor: 'pointer' }} className="flex items-center">
          <div>{renderAvatarUI}</div>
          <PaddingHeader>
            {picoLayoutContext?.menuConfig?.firstNameLastName}{' '}
          </PaddingHeader>
        </div>
      </Dropdown>
    );
  };
