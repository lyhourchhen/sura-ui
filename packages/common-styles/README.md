[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-common-styles

Common Style Components

> Some of the common style components use internally at AsurRaa

# Installation

```sh
yarn add @asurraa/sura-ui-common-styles
```

## Basic Components

```tsx
export const InputHeader = styled.div`
  margin-top: 10px;
`;
export const CenterScreen = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`;
export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const CenterLayout = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
```

## Usage

```tsx
import { InputHeader } from "@src/styles/common.style";

const App = () => {
  return (
    <div>
      // Others JSX Component
      <InputHeader />
    </div>
  );
};
```
