const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
  stories: ["../packages/*/src/stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-ant-design",
  ],
  framework: "@storybook/react",
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    [].push.apply(config.resolve.plugins, [
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
        configFile: path.resolve(__dirname, "./tsconfig.json"),
      }),
    ]);
    return config;
  },
};
