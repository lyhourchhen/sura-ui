import { ComponentMeta, Story } from "@storybook/react";
import { AsurRaaMultipleUpload } from "../asurraa-multiple";
import { AsurRaaUploadProvider } from "../index";

export default {
  component: AsurRaaMultipleUpload,
  title: "Components/MultipleUpload",
} as ComponentMeta<typeof AsurRaaMultipleUpload>;

const Template: Story<typeof AsurRaaMultipleUpload> = () => {
  return (
    <div>
      <AsurRaaUploadProvider
        postUrl={"https://gogym-api-dev.asurraa.com/upload/uploadImage"}
        returnImagePath={"https://gogym-api-dev.asurraa.com/upload/"}
      >
        <AsurRaaMultipleUpload
          value={[
            "3eb4b1ca-bfd0-4ca7-99ab-83ab91bb84e6.png",
            "e7bb89db-2c06-4467-bc7c-820d3748774f.png",
          ]}
          onMount={(value) => {
            console.log("value", value);
          }}
        />
      </AsurRaaUploadProvider>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
