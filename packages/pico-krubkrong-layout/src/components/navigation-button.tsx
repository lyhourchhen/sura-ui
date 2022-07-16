import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import React from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

export const NavigationButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <CaretLeftOutlined
        style={{ cursor: 'pointer', fontSize: 20, paddingLeft: 10 }}
        onClick={() => {
          window.history.back();
        }}
      />
      <CaretRightOutlined
        style={{ cursor: 'pointer', fontSize: 20 }}
        onClick={() => {
          window.history.forward();
        }}
      />
      <ReloadOutlined
        style={{ paddingLeft: 15, cursor: 'pointer', fontSize: 20 }}
        onClick={() => {
          window.location.reload();
          message.loading(t('Reloading...'), 0);
        }}
      />
    </div>
  );
};
