[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-dropdown-filter

> Sura UI Dropdown Filter

## Usage

Dropdown filter is used to sort and search the selection between choices of data. It is normally used to filter through the date of the given data from the API.

See more details related to the AsurRaa utilities [here](https://github.com/asurraa/sura-ui/tree/master/packages/utilities)

## Installation

```sh
yarn add @asurraa/sura-ui-dropdown-filter
```

### Interface

```tsx
export interface AsurRaaDropdownFilterProps extends AsurRaaSelectProps {
  //* This should be moment format type
  filterDateFormat?: string;
  filterOnChange?: (value: AsurRaaFilterOptionType) => void;
  emitFilterValueFromName?: Array<string>;
}
```

## Example

```tsx
import { AsurRaaDropdownFilter } from "@asurraa/sura-ui-dropdown-filter";

const App = (props) => {
  export interface AnyInterfaceProps {
    // Types interface
    cbFilter: AsurRaaDropdownFilterProps["filterOnChange"];
  }

  return (
    <div>
      // Others JSX Component
      <div>
        <AsurRaaDropdownFilter
          emitFilterValueFromName={["Today"]}
          filterOnChange={(value) => {
            setFilterDate({
              startDate: toAsurRaaDate(value.value.startDate),
              endDate: toAsurRaaDate(value.value.endDate),
            });
          }}
        />
      </div>
    </div>
  );
};
```
