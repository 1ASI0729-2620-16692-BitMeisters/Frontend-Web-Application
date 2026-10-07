import { HttpResponse } from 'msw';

export interface FieldError {
  field: string;
  message: string;
}

export function problem(
  request: Request,
  status: number,
  title: string,
  detail: { en: string; es: string },
  errors?: FieldError[],
): HttpResponse<Record<string, unknown>> {
  const spanish = request.headers.get('Accept-Language')?.startsWith('es') ?? false;
  return HttpResponse.json(
    {
      type: 'about:blank',
      title,
      status,
      detail: spanish ? detail.es : detail.en,
      instance: new URL(request.url).pathname,
      ...(errors ? { errors } : {}),
    },
    { status, headers: { 'Content-Type': 'application/problem+json' } },
  );
}

export function unauthorized(request: Request): HttpResponse<Record<string, unknown>> | null {
  if (request.headers.get('Authorization')?.startsWith('Bearer ')) return null;
  return problem(request, 401, 'Unauthorized', {
    en: 'Authentication is required to access this resource.',
    es: 'Se requiere autenticación para acceder a este recurso.',
  });
}
