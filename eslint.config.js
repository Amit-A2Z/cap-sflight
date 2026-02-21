import eslint_js from '@eslint/js'
import tseslint from 'typescript-eslint';
import globals from 'globals'

export default [
  {
    ignores: ["**/dist/*", "gen/**/*", "@cds-models/**/*", "app/**/*", "**/*.cjs"],
  },
  // global rules for all files
  eslint_js.configs.recommended,
  tseslint.configs.base,
  // Generic config for JavaScript files: Setup environment, version, etc.
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es6,
        SELECT: true,
        INSERT: true,
        UPDATE: true,
        DELETE: true,
        CREATE: true,
        DROP: true,
        CDL: true,
        CQL: true,
        CXL: true,
        cds: true,
        sap: true,
      },
    },
    rules: {
      "no-console": "off",
      "require-atomic-updates": "off",
    },
  },
];
