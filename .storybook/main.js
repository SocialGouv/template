const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../src/components"),
      "@config": path.resolve(__dirname, "../src/config"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@modules": path.resolve(__dirname, "../src/modules"),
      "@lib": path.resolve(__dirname, "../src/lib"),
      "@types": path.resolve(__dirname, "../src/types"),
    };
    return config;
  },
};
