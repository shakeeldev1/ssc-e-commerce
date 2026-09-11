export interface ApiEnvelope<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiErrorBody {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
}

/** Pulls a displayable message out of the server's error response shape. */
export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: { data?: unknown } }).response?.data === 'object'
  ) {
    const body = (error as { response: { data: ApiErrorBody } }).response.data;
    if (Array.isArray(body.message)) return body.message.join(', ');
    if (typeof body.message === 'string') return body.message;
  }
  return fallback;
};
