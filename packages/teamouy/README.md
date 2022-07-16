[![NPM](https://img.shields.io/npm/v/@asurraa/teamouy.svg)](https://www.npmjs.com/package/@asurraa/sura-ui-teamouy)

# @asurraa/sura-ui-teamouy

A collection of configuration files containing prettier, eslint, stylelint.

## Installation

With NPM

```bash
npm i -D @asurraa/sura-ui-teamouy
```

With yarn

```bash
npm i -D @asurraa/sura-ui-teamouy
```

# Use

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('@asurraa/sura-teamouy/dist/eslint')],
  rules: {
    // your rules
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('@asurraa/sura-teamouy/dist/stylelint')],
  rules: {
    // your rules
  },
};
```

in `.prettierrc.js`

```js
const teamouy = require('@asurraa/sura-teamouy');

module.exports = {
  ...teamouy.prettier,
};
```

### @AsurRaa 2021
