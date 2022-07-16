## Coming soon

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-sale-card

> Sura UI Sale Card
> Use to render Sale Card component

### Installation

With Yarn

```sh
yarn add @asurraa/sura-ui-sale-card
```

1. Wrap Provider (Wrap )

```tsx
// app.tsx
import react from "react";
import App from "./App";
import { AsurRaaSaleCardProvider } from "@asurraa/sura-ui-sale-card";

const PackageProvider = () => {
  return (
    <div>
      <AsurRaaSaleCardProvider {...imageProvider}>
        <App />
      </AsurRaaSaleCardProvider>
    </div>
  );
};
```

2. Sale Card Usages

## Example

```tsx
import { Col, Row, Tag } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { AsurRaaSaleCard } from "@asurraa/sura-ui-sale-card";
import { customerServices } from "@src/services/customer.service";

import { getQueryDataDetail } from "@src/utilities/getQueryDataDetail";
import { FC, Fragment, useEffect, useState } from "react";
import { PersonalTrainerSectionPageType } from "./interface";
import { kPrimaryColorCode } from "@src/generators/config-generator";
import { SectionHeader } from "../components/SectionHeader";
import {
  useServiceQueueInvoice,
  AllQueueInvoiceType,
} from "../../../services/sale-services-products.service";

interface SaleQueueInvoiceSectionType
  extends PersonalTrainerSectionPageType<AllQueueInvoiceType> {
  selectingId?: number;
  isRefresh: boolean;
  columnLimit: number;
}

const SaleQueueInvoiceSection: FC<SaleQueueInvoiceSectionType> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const {
    data: checkingInOutQueueData,
    swrProps,
    meta,
  } = useServiceQueueInvoice({
    param: `?page=${page}&limit=${props.columnLimit}&filter=${search}`,
  });

  const { data: customerData } = customerServices.useGetAllService({
    page: "__",
    limitPage: 0,
  });

  useEffect(() => {
    if (props.isRefresh === true) {
      swrProps.revalidate();
      swrProps.mutate();
    }
  }, [props.isRefresh, swrProps]);

  return (
    <Fragment>
      <SectionHeader
        meta={meta}
        pageSize={props.columnLimit}
        onSearchResult={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onPageChange={(value) => {
          setPage(value);
        }}
      />
      <Row gutter={16}>
        {checkingInOutQueueData?.map((data, index) => {
          const membership = getQueryDataDetail(
            data.customer_id,
            customerData
          )?.membership;

          return (
            <Col key={index} span={8} style={{ paddingBottom: 10 }}>
              <AsurRaaSaleCard
                antdCardProps={{
                  onClick: () => props.callbackData(data),
                  style: {
                    borderColor:
                      props.selectingId === data.customer_id
                        ? kPrimaryColorCode
                        : "#f0f0f0",
                    borderWidth: 3,
                    cursor: "pointer",
                  },
                }}
                mainTitle={
                  <p>{`${data.customer_firstname} ${data.customer_lastname}`}</p>
                }
                mainValueAtLeft={
                  membership?.name === undefined ? (
                    <Tag></Tag>
                  ) : (
                    <Fragment>
                      {membership.start_date === null ||
                      membership.start_date === undefined ? (
                        <div />
                      ) : (
                        <Tag color={membership?.color}>{membership?.name}</Tag>
                      )}
                    </Fragment>
                  )
                }
                mainValueAtRight={
                  <Tag>
                    {<PhoneOutlined />} {data.customer_phone}
                  </Tag>
                }
                imageValue={
                  getQueryDataDetail(data.customer_id, customerData)?.avatar
                }
              />
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default SaleQueueInvoiceSection;
```
