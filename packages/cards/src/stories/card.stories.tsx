import { ComponentMeta, Story } from "@storybook/react";
import { DashboardCard } from "../index";

export default {
  component: DashboardCard,
  title: "Components/DashboardCard",
} as ComponentMeta<typeof DashboardCard>;

const Template: Story<typeof DashboardCard> = (args) => {
  const icon =
    "https://pos.gogymcambodia.com/static/media/total%20checkin.d093e1c3.svg";
  return (
    <div>
      <DashboardCard
        name="Customer Today"
        picture={icon}
        amount={12}
        detailProps={{}}
        {...args}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
