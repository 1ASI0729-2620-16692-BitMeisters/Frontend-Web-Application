# Vehicle Documentation — FleetSafe

Scope: EP07, US32 (register), US33 (query validity / expiring documents), US34 (update and recalculate). Requirements source: organization Report/README.md, sections 3.1, 4.2, 4.7 and 4.8. This branch integrates the existing `feature/shared-infrastructure` foundation, without importing other feature implementations.

## Run locally

Use Node.js 24.15 or newer within the Node 24 series and npm. The project uses Angular 22; Node 20 is not supported by the installed tooling.

```bash
git clone --branch feature/vehicle-documentation --single-branch https://github.com/1ASI0729-2620-16692-BitMeisters/Frontend-Web-Application.git
cd Frontend-Web-Application
npm ci
npm run mock:vehicle-documentation
```

Keep the API terminal running. In a second terminal in the same directory:

```bash
npm start
```

Open http://localhost:4200/vehicle-documentation (also available at `/app/documents`). The root redirects to this module for branch review. Select ABC-123 or DEF-456 to see every document for that vehicle. The initial view shows expiring documents across all vehicles, rather than every fleet document.

The mock creates three clearly labeled demo documents relative to the first start date: expired, expiring in 15 days, and valid for 90 days. Registered and updated records persist in `server/vehicle-documentation.local.json`, which is ignored by Git. Stop the mock and delete that local file to reset the demo. This API is only for development, has no authentication, and does not implement production authorization or audit events.

## Architecture and integration

- `domain/model`: DocumentType, VehicleDocument, DocumentStatus and date validation.
- `infrastructure`: REST facade, resource assembler and injection configuration.
- `application`: signal-based store, request state and mutation coordination.
- `presentation`: lazy routes, document list and reactive registration/update form.
- `public/i18n/{es,en}.json`: UI text under the `documents` namespace.

Routes must be registered before the team's wildcard route. When integrating with develop, retain other feature route entries, translation namespaces, scripts and navigation. The existing sidebar already points to `/vehicle-documentation`. `vehicleId` is a reference to Fleet Management; this module does not create or change fleet vehicles. IDs are opaque strings and support UUID values.

The alert threshold defaults to 30 calendar days because the report describes a configurable threshold without specifying a value. The expiry date itself is included in EXPIRING; earlier dates are EXPIRED, and dates beyond the threshold are VALID. Calendar comparisons use local today and UTC date-only arithmetic, avoiding time zone shifts. The open page refreshes its date every minute. Expired dates are allowed as explicitly required by US34; a missing expiration date or expiration before issue date is rejected.

## REST contract

| Operation | Endpoint |
| --- | --- |
| Read fleet references | GET `/api/v1/vehicles` |
| Read document types | GET `/api/v1/document-types` |
| Read vehicle documents | GET `/api/v1/vehicles/{vehicleId}/documents` |
| Read expiring documents | GET `/api/v1/documents/expiring?days=30` |
| Register | POST `/api/v1/vehicles/{vehicleId}/documents` |
| Update | PUT `/api/v1/vehicles/{vehicleId}/documents/{documentId}` |

US44 specifies registration and query endpoints; the type catalog, fleet reference query and update endpoint are the front-end integration contract pending the real backend. Responses are unwrapped JSON arrays or document objects. Document fields are `id`, `vehicleId`, `documentTypeId`, `number`, `issueDate`, `expirationDate`, `fileUrl`, `createdAt`, `updatedAt`. Dates use YYYY-MM-DD. The UI derives status centrally rather than trusting stale server status. Backend persistence and scheduled status recalculation remain backend responsibilities.

Override `VEHICLE_DOCUMENTATION_CONFIG` in app providers when the backend is ready:

```ts
import { VEHICLE_DOCUMENTATION_CONFIG } from './vehicle-documentation/infrastructure/vehicle-documentation.config';
// Add to appConfig.providers:
{ provide: VEHICLE_DOCUMENTATION_CONFIG, useValue: { baseUrl: 'https://YOUR-API/api/v1', alertDays: 30 } }
```

The optional digital document field accepts an HTTP(S) link to a hosted PDF/image. It does not upload binary files. Authentication/roles should be supplied by the team's IAM integration; the supervisor label is descriptive, not an access-control mechanism.

## Validation

```bash
npm run build
npm test -- --watch=false
```

Tests cover required expiration dates, invalid dates, expired-document registration, day-zero and exact alert boundaries, recalculation after updates, leap dates and unsafe links. The shared shell test was updated to reflect the real Layout component. REST checks verified rejection (400), creation (201), update (200), and filtered queries. Production compilation passes with a small existing-style initial bundle warning (about 512 kB against a 500 kB warning budget); the 1 MB error budget is respected. Browser visual verification was unavailable in the execution environment.
