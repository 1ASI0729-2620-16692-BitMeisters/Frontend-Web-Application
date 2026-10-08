# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.4] - 2026-10-08

### Fixed
- The mock api rewrites `/api/v1/*` to its collections, so reading and updating a resource by id works and answering an inspection item is saved.

## [0.2.3] - 2026-10-08

### Fixed
- Every sidebar label is visible over the brand color, not only the active one.
- The sidebar shows the released version instead of a fixed `v1.0.0`.
- Incident Management loads its incidents and incident types from the mock api.
- Vehicle Documentation reaches the shared mock api through the reference endpoints, assemblers and store, so it works in the deployed application.

## [0.2.2] - 2026-10-08

### Fixed
- Translations load again: the translation loader no longer goes through the http interceptors, which caused a circular dependency (NG0200).

## [0.2.1] - 2026-10-08

### Added
- Deployment of the web application to GitHub Pages on every push to `main`.
- Mock api deployed on Render at `https://fleetsafe-api.onrender.com/api/v1`, used by the production environment.

## [0.2.0] - 2026-10-07

### Added
- **Pre-operational Inspection**: the driver sees the assigned vehicle, starts an inspection with the odometer reading and answers the SUTRAN checklist grouped by vehicle system.
- **Incident Management**: incident registration and follow-up, with corrective actions, repair scheduling and completion, and resolution.
- **Fleet Management**: companies, fleets, vehicles, drivers and vehicle assignments.
- **Vehicle Documentation**: vehicle documents with registration, update and expiration tracking.
- **Shared**: sidebar, top bar and footer with the FleetSafe brand identity, Angular Material theme and toast notifications.

### Changed
- **Shared kernel** aligned with the learning center reference: `BaseEntity`, `BaseResource`, `BaseAssembler`, `BaseApiEndpoint` and `ErrorHandlingEnabledBaseType` handle the api errors.
- Translations kept in a single dictionary per language (`en-US`, `es-419`) loaded through `@ngx-translate/http-loader`.
- Entities identified by `string` ids.
- Mock api served by json-server from `server/db.json`.

## [0.1.0] - 2026-10-06

### Added
- Angular application with Angular Material and ngx-translate (`en-US`, `es-419`).
- Shared layout with sidebar, language switcher and footer.
- Environments per stage and the json-server mock api.

[0.2.4]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/releases/tag/v0.1.0
