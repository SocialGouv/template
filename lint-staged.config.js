const path = require("path");

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.ts?(x)": filenames =>
    `tsc-files -p tsconfig.json --noEmit ${filenames
      .map(fN => `"${fN}"`)
      .join(" ")}`,
  "*.{js,ts,tsx,jsx}": ["jest --bail --findRelatedTests", buildEslintCommand],
};
