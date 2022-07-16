import { Radio } from 'antd';
import { FC } from 'react';
import { useKrubkrongMainPicoLayoutMainProvider } from '../pico-layout-provider';

export interface LayoutSwitcherProps {}

export const LayoutSwitcher: FC<LayoutSwitcherProps> = () => {
  const {
    layoutConfig: { defaultLayout, onChangeLayout },
  } = useKrubkrongMainPicoLayoutMainProvider();
  return (
    <Radio.Group
      size={'small'}
      options={[
        { label: 'Tablet', value: 'tablet' },
        { label: 'Desktop', value: 'desktop' },
      ]}
      defaultValue={defaultLayout}
      onChange={(e) => {
        const value = e.target.value;
        onChangeLayout(value);
      }}
      optionType="button"
      buttonStyle="solid"
    />
  );
};
