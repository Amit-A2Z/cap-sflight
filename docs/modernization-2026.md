# cap-sflight Modernization (February 2026)

Record of all changes made during the Feb 2026 modernization. Designed to be useful 6-8 months later when revisiting the project.

## Summary of Changes

1. **Node.js dependency updates** - Fresh install with latest versions within existing ranges
2. **ESM migration** - Converted project from CommonJS to ES Modules
3. **CJS config renames** - Renamed CJS-only files to `.cjs` extension
4. **Java dependency updates** - Updated Spring Boot, CDS4J BOM, and Maven plugins

## Phase 1: Node.js Dependency Updates

### What changed
- Deleted `node_modules/` and `package-lock.json`, ran fresh `npm install`
- Bumped `cds-plugin-ui5` from `^0.13.1` to `^0.16.1` (range was too restrictive)

### Version resolutions (Feb 2026)

| Package | Before | After |
|---------|--------|-------|
| @sap/cds | 9.5.2 | 9.7.1 |
| @cap-js/hana | 2.4.1 | 2.6.0 |
| @sap/cds-dk | 9.5.0 | 9.7.2 |
| @cap-js/sqlite | 2.1.0 | 2.1.3 |
| @sap/xssec | 4.12.1 | 4.12.2 |
| @cap-js/cds-types | 0.15.0 | 0.16.0 |
| cds-plugin-ui5 | 0.13.6 | 0.16.3 |
| eslint | 9.39.2 | 9.39.3 |
| typescript-eslint | 8.49.0 | 8.56.0 |

### Notes
- Express intentionally kept at v4 (v5 available but CAP runtime needs v4)
- ESLint kept at v9 (v10 available but is a major version bump)

## Phase 2: ESM Migration

### What changed
1. **`cds add esm`** - Added `"type": "module"` to `.cdsrc.json`, reformatted `mta.yaml`
2. **`package.json`** - Added `"type": "module"` field
3. **`eslint.config.js`** - Converted from CJS (`require`/`module.exports`) to ESM (`import`/`export default`)
4. **`test/setup.ts`** - Changed `module.exports = async () => {}` to `export default async () => {}`
5. **Jest config** - Switched to `ts-jest/presets/default-esm` preset, added `extensionsToTreatAsEsm` and `useESM` transform option
6. **Mocha config** - Changed `"require": "test/setup.ts"` to `"import": "test/setup.ts"`

### Key decisions
- **Why ESM?** SAP CAP 9.x supports ESM natively. ESM is the modern standard and enables better tree-shaking, static analysis, and alignment with the Node.js ecosystem direction.
- **Why `.cdsrc.json` AND `package.json`?** CDS runtime reads its ESM flag from `.cdsrc.json`, while Node.js uses `package.json`. Both are needed.
- **Why keep `.cjs` files?** Karma configs and Kyma deployment scripts use `require()`/`module.exports` patterns that work with their respective tools. Renaming to `.cjs` explicitly opts them into CommonJS mode.

### Gotchas for future reference
- `@cds-models/` types must be regenerated before Jest runs (`npx @cap-js/cds-typer "*" --outputDirectory @cds-models`)
- The `ts-jest` TS151002 warning about hybrid module kind is harmless (recommends `isolatedModules: true`)
- Workspace packages (`app/*`) inherit root `"type": "module"` - this is why Karma configs needed `.cjs`

## Phase 3: CJS Config File Renames

### Files renamed

| Original | Renamed |
|----------|---------|
| `app/.karma/karma.conf.js` | `app/.karma/karma.conf.cjs` |
| `app/.karma/karma-cap-middleware.js` | `app/.karma/karma-cap-middleware.cjs` |
| `app/travel_processor/karma.conf.js` | `app/travel_processor/karma.conf.cjs` |
| `app/travel_analytics/karma.conf.js` | `app/travel_analytics/karma.conf.cjs` |
| `.github/deployment/kyma/scripts/prepareUiFiles.js` | `prepareUiFiles.cjs` |
| `.github/deployment/kyma/scripts/value.js` | `value.cjs` |
| `.github/deployment/kyma/scripts/format-kyma-secret.js` | `format-kyma-secret.cjs` |

### Reference updates
- `karma.conf.cjs`: internal `require("./karma-cap-middleware")` -> `require("./karma-cap-middleware.cjs")`
- `travel_processor/karma.conf.cjs` & `travel_analytics/karma.conf.cjs`: `require("../.karma/karma.conf.js")` -> `.cjs`
- Karma scripts in `app/travel_processor/package.json` & `app/travel_analytics/package.json`: added explicit `karma.conf.cjs` filename
- `build-ui-image.sh`: `value.js` -> `value.cjs`, `prepareUiFiles.js` -> `prepareUiFiles.cjs`
- `create-db-secret.sh`: `format-kyma-secret.js` -> `format-kyma-secret.cjs`
- `prepareUiFiles.cjs`: self-check `endsWith('prepareUiFiles.js')` -> `.cjs`
- `eslint.config.js`: added `"**/*.cjs"` to ignores (deployment scripts don't need linting)

## Phase 4: Java Dependency Updates

### Version changes

| Artifact | Before | After |
|----------|--------|-------|
| spring-boot-starter-parent | 3.5.3 | 3.5.11 |
| cds-services-bom (CDS4J) | 4.0.2 | 4.7.0 |
| maven-compiler-plugin | 3.14.0 | 3.15.0 |
| maven-enforcer-plugin | 3.5.0 | 3.6.2 |
| flatten-maven-plugin | 1.7.1 | 1.7.3 |
| build-helper-maven-plugin | 3.6.1 | 3.6.1 (unchanged) |
| maven-surefire-plugin | 3.5.3 | 3.5.4 |

### Notes
- CDS4J BOM jumped from 4.0.2 to 4.7.0 - significant but within 4.x major
- Spring Boot 3.5.11 includes 8 patch releases of security/bug fixes since 3.5.3
- All 5 Java tests pass after upgrade

## Verification Results

All verification steps passed:

```
npm test           -> 12 passing (Jest)
npm run test:mocha -> 12 passing (Mocha)
npm run lint       -> clean
mvn -B clean verify -> BUILD SUCCESS (5 tests, 0 failures)
```
