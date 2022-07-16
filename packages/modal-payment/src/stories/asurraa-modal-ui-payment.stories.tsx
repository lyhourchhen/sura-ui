import { ComponentMeta, ComponentStory, Story } from "@storybook/react";

import { AsurRaaPaymentModalProvider, AsurRaaPaymentModal } from "../index";

export default {
  component: AsurRaaPaymentModal,
  title: "Components/AsurRaaPaymentModal",
} as ComponentMeta<typeof AsurRaaPaymentModal>;

const Template: Story<typeof AsurRaaPaymentModal> = (args) => {
  return (
    <AsurRaaPaymentModalProvider khrExchangeRate={Number(4000)}>
      <AsurRaaPaymentModal
        viewStyles="description"
        isPayLoading={false}
        title="Sale Payments"
        cashToPayData={122}
        visible={true}
        onPay={(value) => {
          console.log(value);
        }}
        onCancel={() => {
          console.log(true);
        }}
        {...args}
      />
    </AsurRaaPaymentModalProvider>
  );
};

export const TextBoxView = Template.bind({});
TextBoxView.args = {
  defaultProps: {
    viewStyles: "textbox",
  },
};
export const DescriptionView = Template.bind({});
DescriptionView.args = {
  defaultProps: {
    viewStyles: "description",
  },
};
