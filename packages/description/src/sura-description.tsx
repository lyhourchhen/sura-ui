import { Descriptions, Typography } from "antd";
import { FC } from "react";

export interface SuraDescriptionDataInterface {
  key: string;
  value: string;
}

export interface SuraDescriptionProps {
  title: string;
  data: SuraDescriptionDataInterface[];
}

export const SuraDescription: FC<SuraDescriptionProps> = (props) => {
  return (
    <div style={{ backgroundColor: "white", padding: 20 }}>
      <Descriptions title={props.title} bordered>
        {props.data.map((item) => {
          return (
            <Descriptions.Item
              label={item.key}
              span={3}
              style={{
                width: "188px",
              }}
            >
              <Typography.Text>{item.value}</Typography.Text>
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </div>
  );
};
