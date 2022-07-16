import { ComponentMeta, Story } from "@storybook/react";
import { AsurRaaColorPicker, AsurRaaColorPickerProps } from "../index";

export default {
  component: AsurRaaColorPicker,
  title: "Components/ColorPicker",
} as ComponentMeta<typeof AsurRaaColorPicker>;

const Template: Story<typeof AsurRaaColorPicker> = (args) => {
  return (
    <div>
      <h1>This is the Color Picker Components</h1>
      <AsurRaaColorPicker initValue="#00000" {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
