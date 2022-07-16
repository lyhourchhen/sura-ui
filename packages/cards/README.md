## Card Design from asurraa

# @asurraa/cards

> Card functions!
> Use to wrap components into card

## Installation

```sh
yarn add @asurraa/cards
```

** Component Interface **

```tsx
export interface DashboardCardProps {
  picture: string | ReactNode;
  amount: number | string;
  name: string;
  detailProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  prefix?: string;
}
```

## Example

```tsx
import { DashboardCard } from "@asurraa/cards";
import { useTranslation } from "react-i18next";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const SummeryCard = (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <DashboardCard
            name={t("Currently view")}
            amount={"data props"}
            picture={<div></div>}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            name={t("Total Master Agent")}
            amount={"data props"}
            picture={<div></div>}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            name={t("Total Agent")}
            amount={"data props"}
            picture={<div></div>}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            name={t("Total Player")}
            amount={"data props"}
            picture={<div></div>}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <Fragment>
      <div>{SummeryCard}</div>
      // others jsx components
    </Fragment>
  );
};

export default DashboardPage;
```
