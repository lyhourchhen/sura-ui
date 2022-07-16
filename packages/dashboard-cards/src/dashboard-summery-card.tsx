import { Tooltip, Typography } from "antd";
import React, { FC, ReactNode } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styled from "styled-components";
import voca from "voca";

const SummeryCard = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  /* margin-left: 20px;
  margin-right: 20px; */
  top: 88px;
  left: 280px;
  /* width: 350px; */
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
  /* background: black; */
  opacity: 1;
`;

export interface DashboardSummeryCardProps {
  picture: string | ReactNode;
  amount: number | string;
  name: string;
  prefix?: string;
  routeOnclick?: () => void;
}

export const DashboardSummeryCard: FC<DashboardSummeryCardProps> = (props) => {
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
            <div>
              <Icon>
                <img src={props.picture} alt="icon" />
              </Icon>
            </div>
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
            <h2 style={{ fontWeight: "bold", marginBottom: 5 }}>
              {props.prefix} {props?.amount}
            </h2>

            <Typography.Text strong>{props.name}</Typography.Text>
          </div>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.routeOnclick?.();
          }}
        >
          <Tooltip placement="topLeft" title={`Go to ${getLastWrapText}`}>
            <AiOutlineExclamationCircle
              style={{ marginBottom: 60, width: 14, height: 14 }}
            />
          </Tooltip>
        </div>
      </div>
    </SummeryCard>
  );
};
