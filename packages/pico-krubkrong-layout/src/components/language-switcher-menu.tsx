import { Dropdown, DropdownProps, Menu, message } from 'antd';
import i18n from 'i18next';
import { FC } from 'react';
import { IoLanguageOutline } from 'react-icons/io5';
import { MenuItemsProps } from 'src/interface';
import { usePicoConfigLayoutContext } from '../pico-layout-config-provider';
import { PaddingHeader } from './common';

export interface LanguageSwitcherMenuProps extends DropdownProps {}

export const LanguageSwitcherMenu: FC<LanguageSwitcherMenuProps> = (props) => {
  const {
    translateConfig: { translateData, onChangeTranslate },
  } = usePicoConfigLayoutContext();

  const menuDetail: MenuItemsProps[] = translateData?.map((lang, key) => {
    return {
      label: lang.name,
      key: key,
    };
  });
  const menu = <Menu items={menuDetail} />;

  return (
    <Dropdown {...props} overlay={menu} arrow>
      <div
        style={{
          cursor: 'pointer',
          paddingRight: 5,
          paddingTop: 2,
          fontSize: 15,
        }}
      >
        <PaddingHeader>
          <IoLanguageOutline />
        </PaddingHeader>
      </div>
    </Dropdown>
  );
};
