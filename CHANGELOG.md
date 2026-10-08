# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.2.0]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application/releases/tag/v0.1.0
