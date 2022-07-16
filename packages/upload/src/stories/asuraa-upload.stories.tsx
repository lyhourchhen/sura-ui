import { ComponentMeta, Story } from "@storybook/react";
import { AsurRaaUploadProvider } from "../asurraa-upload-provider";
import { AsurRaaSingleUpload } from "../asurraa-upload";

export default {
  component: AsurRaaSingleUpload,
  title: "Components/Upload",
} as ComponentMeta<typeof AsurRaaSingleUpload>;

const Template: Story<typeof AsurRaaSingleUpload> = () => {
  return (
    <AsurRaaUploadProvider
      postUrl={"https://gogym-api-dev.asurraa.com/upload/uploadImage"}
      returnImagePath={"https://gogym-api-dev.asurraa.com/upload/"}
    >
      <AsurRaaSingleUpload
        onChange={(info) => {
          console.log("log info", info);
        }}
      />
    </AsurRaaUploadProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
