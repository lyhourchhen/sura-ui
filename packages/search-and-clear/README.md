[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-search-and-clear

> Search and Clear Modal.
> Build in with Refresh, Add, Clear and Size Properties.

With NPM

```bash
npm i -D @asurraa/sura-ui-search-and-clear

```

With yarn

```sh
yarn add @asurraa/sura-ui-search-and-clear
```

## How to use?

```tsx
import { AsurRaaSearchAndClear } from "@asurraa/sura-ui-search-and-clear";
import { Fragment } from "react";

const example = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <Fragment>
      <AsurRaaSearchAndClear
        refreshButtonProps={{
          onClick: () => {
            // functions...
          },
        }}
        addButtonProps={{
          onClick: () => {
            // functions...
          },
        }}
        clearButtonProps={{
          onClick: () => {
            // functions...
          },
        }}
        size={"large"}
        allowClear
        placeholder={"Search your customers"}
        onChange={(e) => {
          setSearch(e?.target?.value);
        }}
      />
      //* Other JSX components
    </Fragment>
  );
};
```

### @AsurRaa 2021
