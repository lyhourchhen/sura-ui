import { FC } from 'react';

export interface BottomPoweredProps {
  version?: string;
}

export const BottomPowered: FC<BottomPoweredProps> = (props) => {
  return (
    <div
      style={{
        fontSize: '80px',
        lineHeight: 1.1,
        color: '#363853',
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
        v{props?.version}
      </p>
    </div>
  );
};
