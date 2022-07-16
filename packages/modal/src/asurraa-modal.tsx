import {
  DraggableModal,
  DraggableModalProps,
} from "ant-design-draggable-modal";
import "ant-design-draggable-modal/dist/index.css";
import { Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAsurRaaDraggableModalConfig } from "./asurraa-modal-provider";
import "./styles/override.css";
import { useDebounceFn } from "ahooks";
import React from "react";

export const Spacer = styled.div`
  padding: 10px;
`;

export interface AsurRaaModalProps extends DraggableModalProps {
  isSubmitLoading?: boolean;
  modalType?: "dnd" | "normal";
  onChangeVisible?: (visible: boolean | undefined) => void;
  needDebounce?: boolean;
  onOk?: () => void;
}

export const AsurRaaModal: FC<AsurRaaModalProps> = (props) => {
  const { t } = useTranslation();
  const config = useAsurRaaDraggableModalConfig();

  const { run: runDebounce } = useDebounceFn(
    () => {
      props.onOk?.();
    },
    {
      wait: 500,
    }
  );

  const [localStateModalType, setLocalStateModalType] =
    useState<AsurRaaModalProps["modalType"]>("dnd");

  useEffect(() => {
    if (props.modalType) {
      setLocalStateModalType(props.modalType);
    } else {
      setLocalStateModalType(config?.modalType);
    }
  }, []);

  const [visible, setVisible] = useState<boolean | undefined>(false);

  useEffect(() => {
    props.onChangeVisible?.(visible);
    return setVisible(props.visible);
  }, [props, props.visible, visible]);

  const dndModal = (
    <DraggableModal
      destroyOnClose={true}
      keyboard={false}
      initialWidth={500}
      initialHeight={700}
      okText={config?.overwriteText?.okText || t("Ok")}
      cancelText={config?.overwriteText?.cancelText || t("Cancel")}
      okButtonProps={{
        loading: props.isSubmitLoading,
      }}
      {...props}
      onOk={runDebounce}
    />
  );
  const normalModal = <Modal centered {...props} />;

  switch (localStateModalType) {
    case "dnd":
      return dndModal;
    case "normal":
      return normalModal;
    default:
      return dndModal;
  }
};

AsurRaaModal.defaultProps = { needDebounce: true };
