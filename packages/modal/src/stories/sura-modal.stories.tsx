import { ComponentMeta, Story } from "@storybook/react";
import { Button } from "antd";
import React from "react";

import { AsurRaaDraggableModalProvider, AsurRaaModal } from "../index";

export default {
  component: AsurRaaModal,
  title: "Components/AsurRaaModal",
} as ComponentMeta<typeof AsurRaaModal>;

const Template: Story<typeof AsurRaaModal> = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <AsurRaaDraggableModalProvider>
      <AsurRaaModal
        visible={open}
        {...args}
        onOk={() => {
          console.log("log debounce ok");
        }}
      />
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>
    </AsurRaaDraggableModalProvider>
  );
};

export const PrimaryView = Template.bind({});
PrimaryView.args = {};
