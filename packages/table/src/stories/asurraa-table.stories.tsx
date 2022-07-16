import {
  AsurRaaTable,
  AsurRaaColumnsProps,
  AsurRaaTableProvider,
} from "../index";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineAlibaba } from "react-icons/ai";
import { v4 as uuid } from "uuid";

export default {
  component: AsurRaaTable,
  title: "Components/Table",
} as ComponentMeta<typeof AsurRaaTable>;

const Template: Story<typeof AsurRaaTable> = (args) => {
  const dataSource = [
    {
      key: "1",
      name: "key",
      age: 32,
      country: undefined,
    },
    {
      key: "2",
      name: "John",
      address: "10 Downing Street",
      country: "en",
    },
    {
      key: "2",
      name: "John",
    },
  ];

  type DataType = typeof dataSource[0];

  const columns: AsurRaaColumnsProps<DataType>[] = [
    {
      width: "60px",
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      width: "200px",
      title: "country",
      dataIndex: "country",
      key: "country",
    },
    {
      width: "200px",
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    { width: "200px", title: "Address", dataIndex: "address", key: "address" },
  ];

  return (
    <div>
      <AsurRaaTableProvider
        formateDate="YYYY-MM-DD"
        needRefreshLoading={true}
        overallTitleConfig={{
          createButton: "Create",
          deleteButton: "Delete",
          editButton: "Edit",
          refreshButton: "Reload",
          exportCSVButton: "Export CSV",
        }}
      >
        <AsurRaaTable
          deleteActionButton={() => ({
            onOk: () => {
              console.log("hi");
            },
          })}
          detailActionButton={() => ({ onClick: () => console.log("hi") })}
          hideCreateButton={true}
          createText={"Create"}
          dataAllCSV={[]}
          dataFilterCSV={[]}
          asurRaaColumnProps={[...columns]}
          data={[...dataSource]}
          refreshButton={{}}
          {...args}
        />
      </AsurRaaTableProvider>
    </div>
  );
};

interface DataInterface {
  full_name: string;
  git_url: string;
}

const Template1: ComponentStory<typeof AsurRaaTable> = (args) => {
  const [data, setData] = React.useState<DataInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.github.com/users/asurraa/repos")
      .then((res) => {
        console.log("res", res);
        const data = res?.data;
        setData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns: AsurRaaColumnsProps<DataInterface>[] = [
    {
      width: "60px",
      title: "full name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      width: "200px",
      title: "country",
      dataIndex: "git_url",
      key: "GitUrl",
    },
  ];

  return (
    <div>
      <AsurRaaTableProvider
        formateDate="YYYY-MM-DD"
        needRefreshLoading={true}
        overallTitleConfig={{
          createButton: "Create",
          deleteButton: "Delete",
          editButton: "Edit",
          refreshButton: "Reload",
          exportCSVButton: "Export CSV",
        }}
      >
        <AsurRaaTable
          antdTableProps={{ loading: loading }}
          renderMoreActionButton={(propsData) => {
            return [
              {
                label: "Test",
                icon: <AiOutlineAlibaba />,
                key: uuid(),
                onClick: () => {
                  console.log("log action button", propsData);
                },
              },
            ];
          }}
          editActionButton={(propsData) => ({
            onClick: () => {
              console.log("edit action button", propsData);
            },
          })}
          deleteActionButton={(propsData) => ({
            onOk: () => {
              console.log("confirm", propsData);
            },
            onCancel: () => {
              console.log("cancel delete", propsData);
            },
          })}
          detailActionButton={(propsData) => ({
            onClick: () => {
              console.log(propsData);
              // @ts-ignore
              alert("detail", propsData.full_name);
            },
          })}
          hideCreateButton={true}
          createText={"Create"}
          dataAllCSV={[...data]}
          refreshButton={{}}
          {...args}
          asurRaaColumnProps={[...columns]}
          data={data}
        />
      </AsurRaaTableProvider>
    </div>
  );
};

export const BasicTable = Template.bind({});
BasicTable.args = {};

export const Primary = Template1.bind({});
Primary.args = {};
