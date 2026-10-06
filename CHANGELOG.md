# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-16

### Added
- **Project Structure Representation**: Added visual directory tree representation to `README.md` illustrating project structure, documentation, bounded contexts, public assets, and root configurations.
- **Requirement Traceability Matrix (RTM)**: Added RTM mapping table to `docs/user-stories.md` linking user stories to bounded contexts and architectural implementation elements.

### Changed
- **Domain Privacy Encapsulation**: Refactored domain entities (`Category`, `Course`, `User`) and command models (`SignInCommand`, `SignUpCommand`) to use native ECMAScript `#` private fields instead of TypeScript `private _` properties for true runtime encapsulation.
- **Requirement Specifications**: Refactored `docs/user-stories.md` into functional requirement artifacts, removing UI implementation details and third-party dependencies while standardizing acceptance criteria on Given-When-Then scenarios.
- **Project Documentation**: Enhanced `README.md` with Domain-Driven Design (DDD) architectural details, documentation index, and updated Angular 22 platform references.

## [1.0.0] - 2026-09-16

### Added
- **Learning Bounded Context**:
  - Domain models for `Category` and `Course` entities with encapsulation and validation rules.
  - Infrastructure layer containing `CategoriesApiEndpoint`, `CoursesApiEndpoint`, DTO resources, and bidirectional assemblers (`CategoryAssembler`, `CourseAssembler`).
  - Application state management via `LearningStore` utilizing Angular Signals for reactive state tracking, error handling, and loading status.
  - Presentation views for course and category management: `CategoryList`, `CategoryForm`, `CourseList`, and `CourseForm` featuring Angular Material tables, sorting, and pagination.
- **Identity and Access Management (IAM) Bounded Context**:
  - Domain models including `User` entity and command models (`SignInCommand`, `SignUpCommand`).
  - Infrastructure API endpoints (`SignInApiEndpoint`, `SignUpApiEndpoint`), request/response resources, and assemblers (`SignInAssembler`, `SignUpAssembler`).
  - Application state management via `IamStore` supporting token management and user authentication lifecycle.
  - Presentation components and views including `SignInForm`, `SignUpForm`, and `AuthenticationSection`.
- **Shared Architecture & Core Capabilities**:
  - Abstract base architecture classes: `BaseEntity`, `BaseResource`, `BaseResponse`, `BaseAssembler`, `BaseApiEndpoint`, `BaseApi`, and `BaseForm`.
  - Application layout shell comprising `Layout`, `FooterContent`, `LanguageSwitcher`, `Home`, `About`, and `PageNotFound` components.
  - Internationalization (i18n) pipeline via `@ngx-translate` supporting English (`en.json`) and Spanish (`es.json`) localization keys.
  - Mock development backend powered by `json-server` with routes and seed data for courses and categories.
- **Architectural Documentation & Engineering Standards**:
  - Requirement Traceability Matrix (RTM) and functional user stories in `docs/user-stories.md`.
  - Domain-Driven Design PlantUML class diagram in `docs/class-diagram.puml`.
  - Architectural Decision Records in `docs/adrs.md` detailing technical decisions and trade-offs.
  - Developer contributing guidelines in `CONTRIBUTING.md` covering DDD architecture, OOP, Git Flow, Conventional Commits, and SemVer.

### Changed
- **Modern Angular 22 Upgrades**:
  - Upgraded standalone components to leverage Angular's default `OnPush` change detection and signal-based reactivity.
  - Migrated component view queries to modern signal queries (`viewChild`).
  - Modernized dependency injection to use Angular `inject()` across stores, API facades, and components.
- **Theming and Design Tokens**:
  - Adopted Material Design 3 (M3) theming specifications and CSS design tokens (`var(--mat-sys-*)`) in `src/material-theme.scss`.
  - Standardized root stylesheet reference in `angular.json` with `material-theme.scss` and `styles.css`.
- **TypeScript & Toolchain Configuration**:
  - Targeted modern ECMAScript standard (`ES2024`) in `tsconfig.json` for enhanced runtime performance and modern JavaScript features.
  - Configured ESLint flat config (`eslint.config.js`) utilizing `@angular-eslint` and `typescript-eslint` for strict static code analysis.

### Removed
- Removed legacy and unused packages (`baseline-browser-mapping`, `istanbul-lib-instrument`) to optimize build times and dependencies.
- Removed deprecated `@ViewChild` decorator usages in favor of signal-based `viewChild` queries.
