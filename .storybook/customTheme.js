import { create } from "@storybook/theming";

const brandImage = "logo.png";
const brandTitle = "@socialgouv/template";
const brandUrl = "https://github.com/socialgouv/template";
const fontBase = '"Marianne", arial, sans-serif';
const fontCode = "monospace";

export const darkTheme = create({
  base: "dark",
  appBg: "#1E1E1E",
  appContentBg: "#161616",
  barBg: "#161616",
  colorSecondary: "#8585F6",
  textColor: "#FFFFFF",
  brandImage,
  brandTitle,
  brandUrl,
  fontBase,
  fontCode,
});

export const lightTheme = create({
  base: "light",
  appBg: "#F6F6F6",
  appContentBg: "#FFFFFF",
  barBg: "#FFFFFF",
  colorSecondary: "#000091",
  textColor: "#212121",
  brandImage,
  brandTitle,
  brandUrl,
  fontBase,
  fontCode,
});
