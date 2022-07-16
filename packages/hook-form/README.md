[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-hook-form

> Sura UI Hook

## Description

SuraController is a wrapper component for controlled inputs that is used to shortern the CRUD Operation within the form. It is normally use within AsurRaaModel. See more details about the modal [here.](https://github.com/asurraa/sura-ui/tree/master/packages/modal)

## Installation

```sh
yarn add @asurraa/sura-ui-hook-form
```

## Example

```tsx
import {
  SuraController,
  useDefaultFormState,
} from "@asurraa/sura-ui-hook-form";
import {
  useSuraEditableData,
  useSuraModal,
  useSuraPage,
} from "@src/hooks/sura-hook";
import { Input, message, Menu, Tag } from "antd";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { AsurRaaModal } from "@asurraa/sura-ui-modal";
import { AsurRaaSingleUpload } from "@src/components/upload";
import { LockOutlined } from "@ant-design/icons";
import { TAgentService, useAgentService } from "@src/services/agent.service";
import { agentPasswordSchemaResolver } from "@src/schema/agent.password.schema";

const AgentPage = () => {
  const [openModal, setOpenModal] = useSuraModal(false);
  const [editableData, setEditableData] = useSuraEditableData<any>(undefined);
  const defaultForm = useDefaultFormState(editableData);
  const [page, setPage] = useSuraPage(1);
  const [search, setSearch] = useState<string>("");
  const { getAll, deleteOne, createOne, updateOne } = useAgentService();
  const { data, isLoading, refresh, meta } = getAll({
    page,
    param: `search[name]=${search}`,
    limit: 0,
  });
  // * Form
  const { control, handleSubmit, reset } = useForm<TAgentService>();
  const [Modal, setModal] = useState<boolean>(false);

  // * Any other functions can be used here as well

  const PlayerFormModal = (
    <div>
      <AsurRaaModal
        initialHeight={610}
        title={editableData === undefined ? "Create Agent" : "Edit Agent"}
        visible={openModal}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => {
          setOpenModal(false);
          setEditableData(undefined);
          reset();
        }}
      >
        <form>
          <SuraController
            control={control}
            name={"username"}
            titleHeader={"Username"}
            defaultValue={defaultForm("username")}
            render={({ field }) => {
              return (
                <div>
                  <Input {...field} />
                </div>
              );
            }}
          />
          <SuraController
            control={control}
            name={"email"}
            titleHeader={"Email"}
            defaultValue={defaultForm("email")}
            render={({ field }) => {
              return (
                <div>
                  <Input {...field} autoComplete="off" />
                </div>
              );
            }}
          />

          <SuraController
            control={control}
            name={"password"}
            titleHeader={"Password"}
            defaultValue={defaultForm("password")}
            render={({ field }) => {
              return (
                <Input.Password
                  {...field}
                  size="large"
                  allowClear={true}
                  placeholder={"password"}
                  prefix={<LockOutlined />}
                />
              );
            }}
          />
          <SuraController
            control={control}
            name={"nickname"}
            titleHeader={"Nickname"}
            defaultValue={defaultForm("nickname")}
            render={({ field }) => {
              return (
                <div>
                  <Input {...field} autoComplete="off" />
                </div>
              );
            }}
          />
          <SuraController
            control={control}
            name={"user_status"}
            titleHeader={"User Status"}
            defaultValue={defaultForm("user_status")}
            render={({ field }) => {
              return (
                <div>
                  <Input {...field} autoComplete="off" />
                </div>
              );
            }}
          />
          <SuraController
            control={control}
            name={"avatar"}
            titleHeader={"Avatar "}
            defaultValue={defaultForm("avatar")}
            render={({ field: { onChange, value } }) => {
              return <AsurRaaSingleUpload onChange={onChange} value={value} />;
            }}
          />
        </form>
      </AsurRaaModal>
    </div>
  );

  return (
    <Fragment>
      {PlayerFormModal}
      //Other JSX Components
    </Fragment>
  );
};

export default AgentPage;
```
