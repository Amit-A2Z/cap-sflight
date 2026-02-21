# CLAUDE.md - cap-sflight

## What is this project?

SAP CAP (Cloud Application Programming Model) reference application demonstrating a flight booking scenario. Dual-stack: runs on both **Node.js** and **Java/Spring Boot**.

## Module System

**ESM** (`"type": "module"` in package.json + `.cdsrc.json`).
- All `.js`/`.ts` files are ES Modules
- Files using CommonJS (`require`/`module.exports`) are renamed to `.cjs`
- Karma configs and Kyma deployment scripts are `.cjs` exceptions

## Project Structure

```
db/               CDS data model + CSV seed data
srv/              Service definitions + handlers
  travel-service.cds/.ts   Main TravelService (Node.js handler)
  analytics-service.cds    AnalyticsService (no custom handler)
  src/main/java/           Java handlers (Spring Boot)
app/              UI5/Fiori frontends (workspaces)
  travel_processor/        List Report + Object Page
  travel_analytics/        Analytical List Page
  .karma/                  Shared Karma test config (.cjs)
test/             Jest + Mocha tests (TypeScript)
@cds-models/      Generated CDS type models (gitignored, regenerate with cds-typer)
```

## Key Commands

```bash
# Node.js
npm test              # Jest tests (ESM + ts-jest)
npm run test:mocha    # Mocha tests (ESM + tsx)
npm run lint          # ESLint (flat config, ESM)
cds watch             # Local dev server with hot reload

# Java
mvn -B clean verify   # Full build + Spring Boot tests
mvn spring-boot:run   # Run Java server

# Build
npx cds build --profile production,node    # CDS production build (Node)
npx @cap-js/cds-typer "*" --outputDirectory @cds-models   # Regenerate types
```

## Testing

- **Jest**: `test/odata.test.ts` - OData endpoint tests via `@cap-js/cds-test`
  - Preset: `ts-jest/presets/default-esm` with `useESM: true`
  - Setup: `test/setup.ts` (sets CDS_TYPESCRIPT, disables ui5 plugin)
- **Mocha**: Same test file, uses `tsx` loader via `node-option: ["import=tsx"]`
- **Java**: `srv/src/test/java/` - Spring Boot integration tests (5 tests)
- **Karma**: UI5 OPA tests in `app/travel_processor/` and `app/travel_analytics/`

## Dependencies (Feb 2026)

| Package | Version |
|---------|---------|
| @sap/cds | >=9.5 (resolves ~9.7.x) |
| @cap-js/hana | >=2 (resolves ~2.6.x) |
| express | ^4 (intentionally NOT v5) |
| Spring Boot | 3.5.11 |
| CDS4J BOM | 4.7.0 |

## Deployment

- **Cloud Foundry**: `mta.yaml` (3 modules: srv, db-deployer, app-content)
- **Kyma/K8s**: `.github/deployment/kyma/` (Helm charts + shell scripts)
- **Java CF**: `mta-java.yaml`

## Important Notes

- `@cds-models/` must be regenerated after CDS model changes (run cds-typer)
- Express is pinned to v4 intentionally (CAP runtime compatibility)
- Workspace packages (`app/*`) inherit root `"type": "module"`
- ESLint ignores `.cjs` files (deployment scripts, karma configs)
