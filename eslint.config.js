const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    settings: {
      "import/resolver": {
        typescript: {
          extensions: [
            ".ts",
            ".tsx",
            ".native.ts",
            ".native.tsx",
            ".web.ts",
            ".web.tsx",
            ".ios.ts",
            ".ios.tsx",
            ".android.ts",
            ".android.tsx",
          ],
        },
      },
    },
  },
]);
