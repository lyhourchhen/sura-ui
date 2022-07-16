import { Tabs, TabsProps } from "antd";
import React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;

export type DynamicTabDetailType = Array<{
  key: string;
  title: string;
  children: ReactNode | JSX.Element;
}>;

export interface DynamicTabProps {
  /**
   * @example you must create the route base on this model => /product/:key
   */
  masterRoute: string;
  tabDetail: DynamicTabDetailType;
  antdTabProps?: TabsProps;
  children?: ReactNode;
}

export const DynamicTab: FC<DynamicTabProps> = (props) => {
  const { t } = useTranslation();
  const [defaultActiveKey, setDefaultActiveKey] = useState<any>(
    props.tabDetail[0].key
  );
  const param = useParams<{ key: string }>();
  const router = useNavigate();
  const firstArrayKey = props.tabDetail[0].key;

  useEffect(() => {
    const foundParam = props.tabDetail.some((item) => item.key === param.key);
    if (foundParam) {
      setDefaultActiveKey(param.key);
    } else {
      const fallbackRoute = props.masterRoute.replace(":key", firstArrayKey);
      router(fallbackRoute);
    }
  }, [firstArrayKey, param, props.masterRoute, props.tabDetail, router]);

  return (
    <Tabs
      activeKey={defaultActiveKey ? defaultActiveKey : firstArrayKey}
      onChange={(key) => {
        const route = props.masterRoute.replace(":key", key);
        router(route);
      }}
      {...props.antdTabProps}
    >
      {props.tabDetail.map((tab) => {
        return (
          <TabPane tab={t(tab.title)} key={tab.key}>
            {tab.children}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
