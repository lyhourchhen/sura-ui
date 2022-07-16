import styled from "styled-components";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FC, Fragment, ReactNode } from "react";
import voca from "voca";
import { Tooltip, Typography } from "antd";

const SummeryCard = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  top: 88px;
  left: 280px;

  min-height: 122px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 2px;
  opacity: 1;
`;
const Icon = styled.div`
  top: 124px;
  left: 588px;
  width: 50px;
  height: 50px;
  opacity: 1;
`;

export interface DashboardCardProps {
  picture: string | ReactNode;
  amount?: number | string;
  name: string;
  detailProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  prefix?: string;
  onDetailClick?: () => void;
}

export const DashboardCard: FC<DashboardCardProps> = (props) => {
  const wrapText = voca.words(props.name);
  const getLastWrapText = wrapText[wrapText.length - 1];

  return (
    <SummeryCard>
      <div
        style={{
          display: "flex",
          minHeight: 122,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {typeof props.picture === "string" ? (
            <Fragment>
              <Icon>
                <img src={props.picture} alt="icon" />
              </Icon>
            </Fragment>
          ) : (
            props.picture
          )}
          <div
            style={{
              paddingLeft: 30,
              marginTop: 10,
              textAlign: "left",
              lineHeight: 1,
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>
              {props.prefix} {props?.amount}
            </h2>
            <br />
            <Typography.Text strong>{props.name}</Typography.Text>
          </div>
        </div>
        {props.onDetailClick === undefined ? null : (
          <div>
            <div style={{ cursor: "pointer" }} {...props.detailProps}>
              <Tooltip placement="topLeft" title={`Go to ${getLastWrapText}`}>
                <AiOutlineExclamationCircle
                  style={{ marginBottom: 60, width: 14, height: 14 }}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </SummeryCard>
  );
};
