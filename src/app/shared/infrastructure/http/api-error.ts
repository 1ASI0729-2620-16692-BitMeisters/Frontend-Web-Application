import { HttpErrorResponse } from '@angular/common/http';

interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly title: string,
    readonly detail: string,
  ) {
    super(detail);
    this.name = 'ApiError';
  }

  static from(error: HttpErrorResponse): ApiError {
    const problem = ApiError.isProblemDetails(error.error) ? error.error : {};
    return new ApiError(
      error.status,
        problem.title ?? `HTTP ${error.status}`,
      problem.detail ?? problem.title ?? error.message,
    );
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  private static isProblemDetails(body: unknown): body is ProblemDetails {
    return typeof body === 'object' && body !== null && ('title' in body || 'detail' in body);
  }
}
