# Vehicle Documentation — FleetSafe

Scope: EP07, US32 (register), US33 (query validity / expiring documents), US34 (update and recalculate). Requirements source: organization Report/README.md, sections 3.1, 4.2, 4.7 and 4.8.

## Run locally

Use Node.js 24 and npm. In one terminal start the mock api, which serves `server/db.json` together with the other bounded contexts:

```bash
npm ci
npm run mock
```

In a second terminal:

```bash
npm start
```

Open http://localhost:4200/vehicle-documentation. Select ABC-123 or XYZ-456 to see every document for that vehicle. The initial view shows the documents expiring within 30 days across all vehicles.

The mock seeds four documents in the `vehicle-documents` collection and two types in `document-types`. Vehicles come from the Fleet Management `vehicles` collection.

## Architecture and integration

- `domain/model`: DocumentType, DocumentedVehicle, VehicleDocument, DocumentStatus and date validation.
- `infrastructure`: `BaseApiEndpoint` endpoints, assemblers and the `VehicleDocumentationApi` facade, as in the learning center reference.
- `application`: signal-based store, request state and mutation coordination.
- `presentation`: lazy routes, document list and reactive registration/update form.
- `public/i18n/{en-US,es-419}.json`: UI text under the `documents` namespace.

`vehicleId` is a reference to Fleet Management; this module does not create or change fleet vehicles. IDs are opaque strings and support UUID values.

The alert threshold defaults to 30 calendar days because the report describes a configurable threshold without specifying a value. The expiry date itself is included in EXPIRING; earlier dates are EXPIRED, and dates beyond the threshold are VALID. Calendar comparisons use local today and UTC date-only arithmetic, avoiding time zone shifts. The open page refreshes its date every minute. Expired dates are allowed as explicitly required by US34; a missing expiration date or expiration before issue date is rejected.

## REST contract

| Operation | Endpoint |
| --- | --- |
| Read fleet references | GET `/api/v1/vehicles` |
| Read document types | GET `/api/v1/document-types` |
| Read vehicle documents | GET `/api/v1/vehicle-documents` |
| Register | POST `/api/v1/vehicle-documents` |
| Update | PUT `/api/v1/vehicle-documents/{documentId}` |

The paths are configured in the environments (`platformProviderVehicleDocumentsEndpointPath`, `platformProviderDocumentTypesEndpointPath`, `platformProviderVehiclesEndpointPath`). Document fields are `id`, `vehicleId`, `documentTypeId`, `number`, `issueDate`, `expirationDate`, `fileUrl`, `createdAt`, `updatedAt`. Dates use YYYY-MM-DD. The store filters the documents by vehicle or by expiration and derives the status centrally rather than trusting a stale server status.

The optional digital document field accepts an HTTP(S) link to a hosted PDF/image. It does not upload binary files. Authentication/roles should be supplied by the team's IAM integration; the supervisor label is descriptive, not an access-control mechanism.

## Validation

```bash
npm run build
npm test -- --watch=false
```

Tests cover required expiration dates, invalid dates, expired-document registration, day-zero and exact alert boundaries, recalculation after updates, leap dates and unsafe links. The shared shell test was updated to reflect the real Layout component. REST checks verified rejection (400), creation (201), update (200), and filtered queries. Production compilation passes with a small existing-style initial bundle warning (about 512 kB against a 500 kB warning budget); the 1 MB error budget is respected. Browser visual verification was unavailable in the execution environment.
