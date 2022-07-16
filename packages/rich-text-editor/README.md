# @asurraa/sura-ui-rich-text-editor

> Text Editor in React built on top `draft-js`.

<p align="center">
  <img src="https://raw.githubusercontent.com/asurraa/sura-ui/master/packages/rich-text-editor/assets/Screenshot%202021-07-26%20092510.png" />
</p>

### Use case

- use with input form

### Installation

![npm package](https://img.shields.io/npm/v/@asurraa/sura-ui-rich-text-editor?style=flat-square?style=flat-square)

```sh
yarn add @asurraa/sura-ui-rich-text-editor
```

### Property

| Props         | Description                                              | Type                 |
| ------------- | -------------------------------------------------------- | -------------------- |
| value         | value for input into the components                      | `string`             |
| default value | default value input into the component for initial value | `string`             |
| onChange      | callback data when components change                     | `(e: string)=> void` |

### Example

```tsx
import { Fragment } from "react";
import { AsurRaaRichTextEditor } from "@asurraa/sura-ui-rich-text-editor";
const TestPage = () => {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <AsurRaaRichTextEditor />
      </div>
    </Fragment>
  );
};

export default TestPage;
```

### Dependency

- [draft-js](https://github.com/facebook/draft-js)
- [draft-convert](https://github.com/HubSpot/draft-convert)
