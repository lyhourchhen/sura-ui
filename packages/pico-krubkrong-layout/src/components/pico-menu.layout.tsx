import {
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Menu, message, Pagination, Popover, Radio, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { upperCase } from 'voca';
import { usePicoConfigLayoutContext } from '../pico-layout-config-provider';
import { BottomPowered, BottomPoweredProps } from './bottom-powered';
import { FlexBetween, MainLayoutWrapper } from './common';
import { HeaderLogo, HeaderLogoProps } from './head-logo';
import { LayoutSwitcher } from './layout-switcher';
import { MenuCard } from './menu-card';

import { uid } from 'uid';
import { MenuItemsProps } from 'src/interface';

export interface MenuLayoutProps extends HeaderLogoProps, BottomPoweredProps {
  callbackLayoutMode?: (value: unknown) => void;
  userName?: string;
  userRoleName?: string;
}

export const MenuLayout: FC<MenuLayoutProps> = (props) => {
  const { t } = useTranslation();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const picoPageSize = 6;

  const [page, setPage] = useState(1);
  const { i18n } = useTranslation();
  const {
    menuRoutes,
    logoutFunction,
    translateConfig: { translateData, onChangeTranslate },
    routeConfig: { SETTING_PATH, LOGIN_PATH },
    renderAvatarUI,
    loadingConfig: { isGlobalLoading },
    themeConfig: { primaryColor },
  } = usePicoConfigLayoutContext();
  ` `;
  const languageMenuData = translateData.map((item) => {
    return {
      label: item.name,
      value: item.key,
    };
  });

  const menuItems: MenuItemsProps[] = [
    {
      label: (
        <Radio.Group
          size={'small'}
          options={[...languageMenuData]}
          defaultValue={'English'}
          onChange={(lang) => {
            const value = lang.target.value;
            i18n.changeLanguage(value);
            message.info(t(`Change to ${upperCase(value)}`));
            onChangeTranslate?.(value);
          }}
          optionType="button"
          buttonStyle="solid"
        />
      ),
      key: uid(),
    },
    {
      label: <LayoutSwitcher />,
      key: uid(),
    },
    {
      onClick: () => navigate(SETTING_PATH),
      label: t('Profile'),
      key: uid(),
      icon: <UserOutlined />,
    },
    {
      label: t('Logout'),
      key: uid(),
      icon: <LogoutOutlined />,
      onClick: () => {
        logoutFunction();
        navigate(LOGIN_PATH);
        window.location.reload();
      },
    },
  ];

  const profileMenuComponent = <Menu items={menuItems} />;

  const TopUI = (
    <div>
      {screen.md ? (
        <FlexBetween>
          <HeaderLogo layoutName={props.layoutName} shopName={props.shopName} />

          <div className="cursor-pointer">
            <Popover
              placement="leftTop"
              content={profileMenuComponent}
              trigger="click"
            >
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    lineHeight: 1,
                    paddingRight: 15,
                  }}
                >
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {props.userName === 'undefined undefined'
                      ? '...'
                      : props.userName}
                  </p>
                  <p
                    style={{
                      fontSize: '17px',
                      fontWeight: 'bold',
                      textAlign: 'end',
                    }}
                  >
                    {props.userRoleName}
                  </p>
                </div>
                <div>{renderAvatarUI}</div>
              </div>
            </Popover>
          </div>
        </FlexBetween>
      ) : (
        //** to be added with notification bell later */
        <div className="flex justify-center">
          <HeaderLogo layoutName={props.layoutName} />
        </div>
      )}
    </div>
  );

  const generateMenuPagination = (inputPage: number, pageSize: number) => {
    const page = pageSize * (inputPage - 1);
    const start = 0 + page;
    const end = pageSize + page;
    return menuRoutes?.filter((__, index) => index >= start && index < end);
  };

  const totalPage = generateMenuPagination(page, 6);

  const spaceGutter: [number, number] = screen.xl ? [48, 48] : [30, 30];

  const MiddleUI = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      className={`${screen.md ? 'my-0' : 'my-6'}`}
    >
      <div style={{ height: '100%', width: screen.xl ? '83%' : '93%' }}>
        <Row gutter={spaceGutter} align="middle">
          {totalPage?.map((item, key) => {
            return (
              <Col key={key} md={8} span={24}>
                <MenuCard
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );

  const BottomUI = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ marginTop: '10px' }}>
        <BottomPowered version={props.version} />
      </div>
      <div style={{ display: 'flex' }}>
        <Pagination
          style={{ paddingLeft: '125px' }}
          total={menuRoutes?.length}
          defaultCurrent={1}
          pageSize={picoPageSize}
          onChange={(page) => setPage(page)}
        />
        <div
          className="cursor-pointer"
          style={{ display: 'flex', alignItems: 'center' }}
        ></div>
      </div>
    </div>
  );

  const WrapUI = (
    <MainLayoutWrapper
      screenBreak={screen.md || page === 2 ? false : true}
      style={{ backgroundColor: '#EFF2F5' }}
    >
      <div>{TopUI}</div>
      <div>
        {isGlobalLoading ? (
          <div className="flex justify-center">
            <LoadingOutlined />
          </div>
        ) : (
          MiddleUI
        )}
      </div>
      <div>{BottomUI}</div>
    </MainLayoutWrapper>
  );
  return (
    <div>
      <LoadingBar
        color={primaryColor}
        progress={100}
        onLoaderFinished={() => 0}
      />
      {WrapUI}
    </div>
  );
};
