import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { motion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import voca from 'voca';
import { FlexDown } from './common';

export interface MenuCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  name: string;
  icon: ReactNode;
  description: string | undefined;
}

const MenuCardWrapper = styled.div`
  height: 184px;
  border-radius: 12px;
  background-color: white;
  padding: '20px';
`;

const CardIconWrapper = styled.div`
  height: 53px;
  width: 53px;
`;

const Hoverable = styled.div`
  :hover {
    color: #363853;
    opacity: 100%;
  }
`;

export const MenuCard: FC<MenuCardProps> = (props) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <MenuCardWrapper>
        <Hoverable>
          <div
            {...props}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 184,
              alignContent: 'space-around',
              justifyContent: 'center',
              boxShadow: '-10px 10px 12px 5px rgba(10,10,10,0.08)',
              borderRadius: '10px',
              paddingLeft: '20px',
              cursor: 'pointer',
              backgroundColor: '#ffff',
            }}
          >
            <CardIconWrapper style={{ fontSize: '40px' }}>
              {props.icon}
            </CardIconWrapper>
            <FlexDown style={{ lineHeight: 2 }}>
              <p
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  fontFamily: 'Be Vietnam Pro ,Kantumruy',
                }}
              >
                {voca.capitalize(t(props.name))}
              </p>

              <p
                style={{
                  textOverflow: 'ellipsis',
                  fontWeight: 'bold',
                  fontFamily: 'Kantumruy, Be Vietnam Pro',
                  marginTop: '10px',
                  fontSize: `${screens.lg ? ' 1rem ' : '0.90rem'}`,
                }}
              >
                {t(props.description ?? '')}
              </p>
            </FlexDown>
          </div>
        </Hoverable>
      </MenuCardWrapper>
    </motion.div>
  );
};
