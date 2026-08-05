import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/axios';
import type {
  ApiEnvelope,
  DashboardStats,
  EngineSettings,
  Execution,
  Flow,
  FlowDetail,
  FlowFormPayload,
  IntegrationOperation,
  Pagination,
  TestRunResult,
} from '../types';

/** Everything the console API returns is enveloped; the hooks unwrap it. */
async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await apiClient.get<ApiEnvelope<T>>(url, { ...(params ? { params } : {}) });
  return response.data.data;
}

async function getPaged<T>(
  url: string,
  params?: Record<string, unknown>,
): Promise<{ data: T; pagination?: Pagination }> {
  const response = await apiClient.get<ApiEnvelope<T>>(url, { ...(params ? { params } : {}) });
  return { data: response.data.data, ...(response.data.pagination ? { pagination: response.data.pagination } : {}) };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Doubles as the session probe: it is the first call the app makes, so a 401
 * here is what raises the API-key gate.
 */
export const useStatsQuery = () =>
  useQuery<DashboardStats>({
    queryKey: ['stats'],
    queryFn: () => get<DashboardStats>('/stats'),
    refetchInterval: 15000,
    retry: false,
  });

export const useFlowsQuery = (search?: string, status?: string) =>
  useQuery<Flow[]>({
    queryKey: ['flows', search ?? '', status ?? 'all'],
    queryFn: () =>
      get<Flow[]>('/flows', {
        ...(search ? { search } : {}),
        ...(status && status !== 'all' ? { status } : {}),
        limit: 100,
      }),
  });

export const useFlowDetailQuery = (flowId?: string) =>
  useQuery<FlowDetail>({
    queryKey: ['flow', flowId],
    queryFn: () => get<FlowDetail>(`/flows/${flowId}`),
    enabled: Boolean(flowId),
    // A flow being watched while it runs should tick over on its own.
    refetchInterval: 10000,
  });

export const useExecutionsQuery = (params?: {
  flowId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) =>
  useQuery<{ data: Execution[]; pagination?: Pagination }>({
    queryKey: ['executions', params ?? {}],
    queryFn: () =>
      getPaged<Execution[]>('/executions', {
        ...(params?.flowId ? { flowId: params.flowId } : {}),
        ...(params?.status && params.status !== 'all' ? { status: params.status } : {}),
        limit: params?.limit ?? 25,
        offset: params?.offset ?? 0,
      }),
    refetchInterval: 10000,
  });

export const useExecutionDetailQuery = (executionId?: string) =>
  useQuery<Execution>({
    queryKey: ['execution', executionId],
    queryFn: () => get<Execution>(`/executions/${executionId}`),
    enabled: Boolean(executionId),
    // Steps are created lazily by the worker, one at a time, so a running
    // execution grows while it is being watched.
    refetchInterval: (query) =>
      query.state.data && ['pending', 'running'].includes(query.state.data.status) ? 3000 : false,
  });

/** What the worker can actually execute – drives the step editor's dropdowns. */
export const useIntegrationsQuery = () =>
  useQuery<IntegrationOperation[]>({
    queryKey: ['integrations'],
    queryFn: () => get<IntegrationOperation[]>('/integrations'),
    staleTime: 5 * 60 * 1000,
  });

export const useSettingsQuery = () =>
  useQuery<EngineSettings>({
    queryKey: ['settings'],
    queryFn: () => get<EngineSettings>('/settings'),
    refetchInterval: 30000,
  });

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

function useFlowInvalidation() {
  const queryClient = useQueryClient();
  return (flowId?: string) => {
    void queryClient.invalidateQueries({ queryKey: ['flows'] });
    void queryClient.invalidateQueries({ queryKey: ['stats'] });
    if (flowId) void queryClient.invalidateQueries({ queryKey: ['flow', flowId] });
  };
}

export const useCreateFlowMutation = () => {
  const invalidate = useFlowInvalidation();
  return useMutation({
    mutationFn: async (payload: FlowFormPayload) => {
      const response = await apiClient.post<ApiEnvelope<FlowDetail>>('/flows', payload);
      return response.data.data;
    },
    onSuccess: (flow) => invalidate(flow.id),
  });
};

export const useUpdateFlowMutation = () => {
  const invalidate = useFlowInvalidation();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FlowFormPayload> }) => {
      const response = await apiClient.put<ApiEnvelope<FlowDetail>>(`/flows/${id}`, data);
      return response.data.data;
    },
    onSuccess: (_flow, { id }) => invalidate(id),
  });
};

export const useDeleteFlowMutation = () => {
  const invalidate = useFlowInvalidation();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<ApiEnvelope<{ id: string; name: string }>>(`/flows/${id}`);
      return response.data.data;
    },
    onSuccess: () => invalidate(),
  });
};

/** Dry run. Writes nothing, so nothing is invalidated afterwards. */
export const useTestFlowMutation = () =>
  useMutation({
    mutationFn: async ({ flowId, payload }: { flowId: string; payload?: string }) => {
      const response = await apiClient.post<ApiEnvelope<TestRunResult>>(`/flows/${flowId}/test`, {
        ...(payload !== undefined ? { payload } : {}),
      });
      return response.data.data;
    },
  });

/** The real thing: persists an execution and queues its first step. */
export const useEmitEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      flowId,
      payload,
      idempotencyKey,
    }: {
      flowId: string;
      payload?: string;
      idempotencyKey?: string;
    }) => {
      const response = await apiClient.post<
        ApiEnvelope<{ duplicate: boolean; execution: Execution | null }>
      >(`/flows/${flowId}/emit`, {
        ...(payload !== undefined ? { payload } : {}),
        ...(idempotencyKey ? { idempotencyKey } : {}),
      });
      return response.data.data;
    },
    onSuccess: (_result, { flowId }) => {
      void queryClient.invalidateQueries({ queryKey: ['flow', flowId] });
      void queryClient.invalidateQueries({ queryKey: ['executions'] });
      void queryClient.invalidateQueries({ queryKey: ['flows'] });
      void queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

/** Replays the original trigger payload as a new execution. */
export const useRerunExecutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (executionId: string) => {
      const response = await apiClient.post<ApiEnvelope<{ execution: Execution | null }>>(
        `/executions/${executionId}/rerun`,
      );
      return response.data.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['executions'] });
      void queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};
