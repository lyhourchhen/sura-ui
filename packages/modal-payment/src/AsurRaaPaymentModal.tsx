/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LoadingOutlined } from "@ant-design/icons";
import { InputHeader } from "@asurraa/sura-ui-common-styles";
import { AsurRaaInputMoney } from "@asurraa/sura-ui-input-money";
import {
  AsurRaaDraggableModalProvider,
  AsurRaaModal,
  AsurRaaModalProps,
} from "@asurraa/sura-ui-modal";
import { AsurRaaRichTextEditor } from "@asurraa/sura-ui-rich-text-editor";
import { useDebounceFn } from "ahooks";
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Divider,
  Radio,
  Row,
  Typography,
} from "antd";
import React, { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAsurRaaPaymentModal } from "./AsurRaaPaymentModalProvider";
import { fixNumberFunc } from "./utils/fix-number";
import "./style/inputFontSize.css";

export type CallBackPayEssentialValueType = {
  grandTotalUSD: number;
  grandTotalKHR: number;
  cashBackUSD: number;
  cashBackKHR: number;
  cashReceivedTotalAsUSD: number;
  cashReceivedTotalAsKHR: number;
  cashReceivedUSD: number;
  cashToPayInKHR: number;
  cashToPayInUSD: number | undefined;
  paymentMethod: "CASH" | "BANK";
  note: string | undefined;
};
export interface AsurRaaPaymentModalProps extends AsurRaaModalProps {
  onPay?: (
    value: CallBackPayEssentialValueType,
    e: React.MouseEvent<HTMLElement>
  ) => void;
  onPayEvent?: (
    e: React.MouseEvent<HTMLElement>,
    value?: CallBackPayEssentialValueType
  ) => void;
  cashToPayData: number | undefined;
  modalProps?: AsurRaaModalProps;
  callBackPayEssentialValue?: (value: CallBackPayEssentialValueType) => void;
  isPayLoading: boolean | undefined;
  viewStyles?: "textbox" | "description";
}

export const AsurRaaPaymentModal: FC<AsurRaaPaymentModalProps> = (props) => {
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const { t } = useTranslation();
  const [cashToPayInUSD, setCashToPayInUSD] = useState<number>();
  const providerConfig = useGetAsurRaaPaymentModal();

  const kCurrencyRielExchange = Number(providerConfig?.khrExchangeRate);

  const [paymentMethod, setPaymentsMethod] = useState<"CASH" | "BANK">("CASH");

  const cashToPayInKHR = useMemo<number>(() => {
    return kCurrencyRielExchange * cashToPayInUSD!;
  }, [cashToPayInUSD, kCurrencyRielExchange]);

  const [noteState, setNoteState] = useState<string | undefined>();
  const [cashReceivedUSD, setCashReceivedUSD] = useState<number>(0);
  const [cashReceivedKHR, setCashReceivedKHR] = useState<number>(0);

  const cashReceivedTotalAsUSD = useMemo(() => {
    return cashReceivedUSD + cashReceivedKHR / kCurrencyRielExchange;
  }, [cashReceivedKHR, cashReceivedUSD, kCurrencyRielExchange]);

  const isAllowToPay =
    cashReceivedTotalAsUSD < props.cashToPayData! ? true : false;

  const grandTotalUSD = props.cashToPayData!;
  const grandTotalKHR = props.cashToPayData! * kCurrencyRielExchange;

  const cashBackUSD = useMemo(() => {
    const sum = cashReceivedTotalAsUSD - props.cashToPayData!;
    if (sum < 0) {
      return 0;
    } else {
      return sum;
    }
  }, [cashReceivedTotalAsUSD, props.cashToPayData]);
  const cashBackKHR = useMemo(() => {
    const sum = cashBackUSD * kCurrencyRielExchange;
    if (sum < 0) {
      return 0;
    } else {
      return sum;
    }
  }, [cashBackUSD, kCurrencyRielExchange]);

  useEffect(() => {
    setCashToPayInUSD(
      (props?.cashToPayData ?? 0) - cashReceivedTotalAsUSD < 0
        ? 0
        : (props?.cashToPayData ?? 0) - cashReceivedTotalAsUSD
    );
  }, [props.cashToPayData, cashReceivedTotalAsUSD]);

  const { run } = useDebounceFn((e) => {
    props?.callBackPayEssentialValue?.({
      grandTotalUSD,
      grandTotalKHR,
      cashBackKHR,
      cashBackUSD,
      cashReceivedTotalAsUSD,
      cashReceivedUSD,
      cashToPayInKHR,
      cashToPayInUSD,
      paymentMethod,
      cashReceivedTotalAsKHR: cashReceivedKHR,
      note: noteState,
    });
    props?.onPayEvent?.(e, {
      grandTotalUSD,
      grandTotalKHR,
      cashBackKHR,
      cashBackUSD,
      cashReceivedTotalAsUSD,
      cashReceivedUSD,
      cashToPayInKHR,
      cashToPayInUSD,
      paymentMethod,
      cashReceivedTotalAsKHR: cashReceivedKHR,
      note: noteState,
    });
    props?.onPay?.(
      {
        grandTotalUSD,
        grandTotalKHR,
        cashBackKHR,
        cashBackUSD,
        cashReceivedTotalAsUSD,
        cashReceivedUSD,
        cashToPayInKHR,
        cashToPayInUSD,
        paymentMethod,
        cashReceivedTotalAsKHR: cashReceivedKHR,
        note: noteState,
      },
      e
    );
  });

  const ModalEditor = (
    <AsurRaaModal
      visible={openEditor}
      title={"Payments Note"}
      initialHeight={350}
      onCancel={() => {
        setOpenEditor(false);
      }}
      okText={t("Save")}
      onOk={() => setOpenEditor(false)}
    >
      <div style={{ height: 150 }}>
        <AsurRaaRichTextEditor
          onChange={(value: React.SetStateAction<string | undefined>) => {
            setNoteState(value);
          }}
          defaultValue={noteState}
        />
      </div>
    </AsurRaaModal>
  );

  return (
    <div>
      <AsurRaaDraggableModalProvider>
        {ModalEditor}
        <AsurRaaModal
          afterClose={() => {
            setCashReceivedUSD(0), setCashReceivedKHR(0);
          }}
          title={t("Sale Membership Payments")}
          destroyOnClose={true}
          okText={"Pays"}
          initialHeight={600}
          // initialWidth={500}
          footer={
            <Fragment>
              <Button
                disabled={isAllowToPay}
                style={{ width: "100%", height: "50px" }}
                type="primary"
                onClick={run}
              >
                <Typography.Text
                  strong
                  style={{ color: isAllowToPay ? "gray" : "white" }}
                >
                  {props.isPayLoading ? (
                    <LoadingOutlined style={{ marginRight: 10 }} />
                  ) : null}
                  {t("Payment")}
                </Typography.Text>
              </Button>
            </Fragment>
          }
          {...props}
        >
          {props.viewStyles === "textbox" ? (
            <div>
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <InputHeader>{t("Cash To Pay in USD")}</InputHeader>
                  <AsurRaaInputMoney
                    disabled={true}
                    currency="USD"
                    size="large"
                    readOnly
                    style={{ width: "300px" }}
                    className="payment-input-number-input"
                    value={fixNumberFunc(cashToPayInUSD ?? 0, 2)}
                  />
                  <InputHeader>{t("Cash To Pay in KHR")}</InputHeader>
                  <AsurRaaInputMoney
                    disabled={true}
                    currency="KHR"
                    readOnly
                    size="large"
                    style={{ width: "300px" }}
                    value={fixNumberFunc(cashToPayInKHR, 0)}
                  />
                </Col>
                <Col span={12}>
                  <InputHeader>{t("Cash Back in USD")}</InputHeader>
                  <AsurRaaInputMoney
                    size="large"
                    currency="USD"
                    readOnly
                    disabled
                    style={{ width: "300px" }}
                    value={fixNumberFunc(cashBackUSD, 2)}
                  />
                  <InputHeader>{t("Cash Back in KHR")}</InputHeader>
                  <AsurRaaInputMoney
                    size="large"
                    currency="KHR"
                    readOnly
                    disabled
                    style={{ width: "300px" }}
                    value={fixNumberFunc(cashBackKHR, 0)}
                  />
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Descriptions bordered colon>
                <Descriptions.Item
                  label={t("Cash To Pay in USD")}
                  span={3}
                  style={{
                    width: "188px",
                  }}
                >
                  <Typography.Text strong>
                    $ {fixNumberFunc(cashToPayInUSD ?? 0, 2)}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={t("Cash To Pay in KHR")}
                  span={3}
                  style={{
                    width: "188px",
                  }}
                >
                  <Typography.Text strong>
                    KHR {fixNumberFunc(cashToPayInKHR ?? 0, 2)}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={t("Cash Change in USD")}
                  span={3}
                  style={{
                    width: "188px",
                  }}
                >
                  <Typography.Text strong>
                    $ {fixNumberFunc(cashBackUSD ?? 0, 2)}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={t("Cash Change in KHR")}
                  span={3}
                  style={{
                    width: "188px",
                  }}
                >
                  <Typography.Text strong>
                    KHR {fixNumberFunc(cashBackKHR ?? 0, 2)}
                  </Typography.Text>
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <InputHeader>Payments Method</InputHeader>
            <InputHeader>
              <a onClick={() => setOpenEditor(true)}>Note</a>
            </InputHeader>
          </div>
          <Radio.Group
            defaultValue={"CASH"}
            onChange={(e) => setPaymentsMethod(e.target.value)}
          >
            <Radio value={"CASH"}>Cash</Radio>
            <Radio value={"BANK"}>Bank</Radio>
          </Radio.Group>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <InputHeader>{t("Cash Receive in USD")}</InputHeader>
              <AsurRaaInputMoney
                currency="USD"
                size="large"
                style={{ width: "100%" }}
                min={0}
                value={fixNumberFunc(cashReceivedUSD, 0)}
                autoFocus
                onChange={(value: any) => {
                  setCashReceivedUSD(Number(value));
                }}
              />
            </Col>
            <Col span={12}>
              <InputHeader>{t("Cash Receive in KHR")}</InputHeader>
              <AsurRaaInputMoney
                currency="KHR"
                size="large"
                min={0}
                style={{ width: "100%" }}
                defaultValue={0}
                value={fixNumberFunc(cashReceivedKHR, 0)}
                onChange={(value: any) => {
                  setCashReceivedKHR(Number(value));
                }}
              />
            </Col>
          </Row>
        </AsurRaaModal>
      </AsurRaaDraggableModalProvider>
    </div>
  );
};

AsurRaaPaymentModal.defaultProps = {
  viewStyles: "textbox",
};
