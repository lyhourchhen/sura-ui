import { ComponentMeta, Story } from "@storybook/react";
import { Col, Row, Tag } from "antd";
import { AsurRaaTable } from "../../../table/src/index";
import { AsurRaaSaleCard, AsurRaaSaleCardProvider } from "../index";

export default {
  component: AsurRaaSaleCard,
  title: "Components/AsurRaaSaleCard",
} as ComponentMeta<typeof AsurRaaTable>;

const Template: Story<typeof AsurRaaSaleCard> = (args) => {
  const fallBackImageUrl =
    "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png";
  const dataSource = [
    {
      key: "1",
      name: "test112321312341243RTE4GERGASEG5SEATYGE5YTGESR5GHYHdasZDFawefdaefesafsa",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "test123",
      price: 32,
      quantity: 69,
    },
    {
      key: "2",
      name: "test2",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "testffffff",
      price: 32,
      quantity: 69,
    },
    {
      key: "3",
      name: "test3",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "testddsdd",
      price: 32,
      quantity: 69,
    },
    {
      key: "3",
      name: "test3",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "testddsdd",
      price: 32,
      quantity: 69,
    },
    {
      key: "3",
      name: "test3",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "testddsdd",
      price: 32,
      quantity: 69,
    },
    {
      key: "3",
      name: "test3",
      image:
        "https://raw.githubusercontent.com/asurraa/assets/master/fallback/fallback-white.png",
      title: "testddsdd",
      price: 32,
      quantity: 69,
    },
  ];

  const imageProvider = {
    imageUrl: fallBackImageUrl,
    fallbackImage: fallBackImageUrl,
  };
  return (
    <div>
      <AsurRaaSaleCardProvider {...imageProvider}>
        <Row gutter={16}>
          {dataSource?.map((product, key) => {
            return (
              <Col key={key} span={8} style={{ paddingBottom: 10 }}>
                <AsurRaaSaleCard
                  imageHeader={{
                    headers: {
                      subdomain: "https://api.krubkrong.com/",
                    },
                  }}
                  antdCardProps={{
                    onClick: () => {
                      console.log("clicked");
                    },
                  }}
                  imageViewerProps={{ overrideDefaultImage: fallBackImageUrl }}
                  imageValue={product.image}
                  mainTitle={product.name}
                  mainValueAtLeft={
                    <Tag color="green">${product.price.toString()}</Tag>
                  }
                  mainValueAtRight={
                    <Tag>QTY : {product.quantity.toString()} </Tag>
                  }
                  {...args}
                />
              </Col>
            );
          })}
        </Row>
      </AsurRaaSaleCardProvider>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
