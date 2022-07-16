import { FC } from 'react';

export interface HeaderLogoProps {
  layoutName?: string;
  shopName?: string;
}
export const HeaderLogo: FC<HeaderLogoProps> = (props) => {
  return (
    <div
      style={{
        fontWeight: 'bold',
        lineHeight: 0.5,
        color: '#363853',
      }}
    >
      <div>
        <p
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            fontFamily: 'Be Vietnam Pro',
          }}
        >
          {props?.layoutName}
        </p>
        <p
          style={{
            marginTop: 20,
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Be Vietnam Pro',
          }}
        >
          {props?.shopName}
        </p>
      </div>
    </div>
  );
};
