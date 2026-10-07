import { setupServer } from 'msw/node';
import { inspectionHandlers } from './inspection.handlers';

const server = setupServer(...inspectionHandlers);
const authorized = { Authorization: 'Bearer demo-token', 'Content-Type': 'application/json' };

function url(path: string): string {
  return `${location.origin}/api/v1${path}`;
}

describe('inspection mock api', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());

  it('rejects requests without an access token', async () => {
    const response = await fetch(url('/drivers/me/vehicle-assignment'));

    expect(response.status).toBe(401);
    expect(response.headers.get('Content-Type')).toContain('application/problem+json');
  });

  it('returns the vehicle assigned to the demo driver', async () => {
    const response = await fetch(url('/drivers/me/vehicle-assignment'), { headers: authorized });
    const assignment = await response.json();

    expect(response.status).toBe(200);
    expect(assignment.vehicle.plate).toBe('ABC-123');
  });

  it('returns the active catalog ordered by display order', async () => {
    const response = await fetch(url('/inspection-items?isActive=true'), { headers: authorized });
    const items: { displayOrder: number }[] = await response.json();

    expect(items).toHaveLength(42);
    expect(items[0].displayOrder).toBeLessThan(items[1].displayOrder);
  });

  it('starts an inspection and rejects a second one for the same vehicle', async () => {
    const start = () =>
      fetch(url('/inspections'), {
        method: 'POST',
        headers: authorized,
        body: JSON.stringify({ odometer: 184320 }),
      });

    const created = await start();
    const inspection = await created.json();
    expect(created.status).toBe(201);
    expect(inspection.status).toBe('IN_PROGRESS');
    expect(inspection.results).toEqual([]);

    const stored = await fetch(url(`/inspections/${inspection.id}`), { headers: authorized });
    expect((await stored.json()).odometer).toBe(184320);

    const second = await start();
    expect(second.status).toBe(409);
  });

  it('rejects a negative odometer reading with the field error', async () => {
    const response = await fetch(url('/inspections'), {
      method: 'POST',
      headers: authorized,
      body: JSON.stringify({ odometer: -5 }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors[0].field).toBe('odometer');
  });
});
