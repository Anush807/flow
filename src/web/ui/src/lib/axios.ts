import axios, { AxiosError } from 'axios';
import { currentApiKey, useAuthStore } from '../store/useAuthStore';

/**
 * Same-origin by design: in production the API process serves this bundle, and
 * in development Vite proxies `/api` to it. Nothing here needs a base URL, and
 * therefore nothing needs CORS.
 */
export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  // Long enough for a cold serverless Postgres, short enough that a hung
  // request surfaces as an error instead of a spinner that never resolves.
  timeout: 30000,
});

apiClient.interceptors.request.use((request) => {
  const key = currentApiKey();
  if (key) {
    request.headers.set('x-api-key', key);
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // The key is wrong or missing – the gate takes over from here.
      useAuthStore.getState().markRejected();
    }
    return Promise.reject(error);
  },
);

/**
 * The API answers errors as `{ message, error, issues? }`. Surfacing that beats
 * "Request failed with status code 409", which tells an operator nothing about
 * which field they got wrong.
 */
export function apiErrorMessage(error: unknown, fallback = 'Request failed'): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const data = error.response?.data as
    | { message?: string; error?: string; issues?: Array<{ path: string; message: string }> }
    | undefined;

  if (data?.issues?.length) {
    return data.issues.map((issue) => `${issue.path}: ${issue.message}`).join(', ');
  }

  return data?.error ?? data?.message ?? error.message ?? fallback;
}
