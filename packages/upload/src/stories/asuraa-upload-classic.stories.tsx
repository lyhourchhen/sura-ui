import { ComponentMeta, Story } from "@storybook/react";
import { AsurRaaUploadProvider } from "../asurraa-upload-provider";
import { AsurRaaSingleUploadClassic } from "../asurraa-upload-classic";

export default {
  component: AsurRaaSingleUploadClassic,
  title: "Components/UploadClassic",
} as ComponentMeta<typeof AsurRaaSingleUploadClassic>;

const Template: Story<typeof AsurRaaSingleUploadClassic> = () => {
  return (
    <AsurRaaUploadProvider
      postUrl={"https://gogym-api-dev.asurraa.com/upload/uploadImage"}
      returnImagePath={"https://gogym-api-dev.asurraa.com/upload/"}
    >
      <AsurRaaSingleUploadClassic
        onChange={(info) => {
          console.log("log info", info);
        }}
        // corpProps={{ aspect: 12 / 12 }}
      />
    </AsurRaaUploadProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
