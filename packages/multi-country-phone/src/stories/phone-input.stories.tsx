import { ComponentMeta, Story } from "@storybook/react";
import { SuraMultiCountryPhoneInput } from "../sura-multiple-country-phone-input";

export default {
  component: SuraMultiCountryPhoneInput,
  title: "Components/multi-country-phone",
} as ComponentMeta<typeof SuraMultiCountryPhoneInput>;

const Template: Story<typeof SuraMultiCountryPhoneInput> = (args) => {
  return (
    <SuraMultiCountryPhoneInput
      onChange={(value) => {
        console.log("onChange", value);
      }}
      {...args}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
