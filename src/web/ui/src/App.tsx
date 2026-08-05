import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { FlowsListPage } from './pages/FlowsListPage';
import { FlowDetailPage } from './pages/FlowDetailPage';
import { FlowFormPage } from './pages/FlowFormPage';
import { ExecutionsListPage } from './pages/ExecutionsListPage';
import { ExecutionDetailPage } from './pages/ExecutionDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { SupportPage } from './pages/SupportPage';
import { ActionModals } from './components/ActionModals';
import { ApiKeyGate } from './components/ApiKeyGate';
import { ToastContainer } from './components/Toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      // A 401 is not worth retrying – it will keep being a 401 until the
      // operator supplies a different key.
      retry: (failureCount, error) =>
        failureCount < 2 &&
        (error as { response?: { status?: number } })?.response?.status !== 401,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ApiKeyGate>
          <div className="bg-background text-on-surface font-body-base antialiased flex h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
            <Sidebar />

            {/* Main content, offset by the fixed sidebar */}
            <main className="ml-sidebar-width flex-1 h-screen overflow-hidden flex flex-col relative bg-background">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/flows" element={<FlowsListPage />} />
                <Route path="/flows/new" element={<FlowFormPage />} />
                <Route path="/flows/:id" element={<FlowDetailPage />} />
                <Route path="/flows/:id/edit" element={<FlowFormPage />} />
                <Route path="/executions" element={<ExecutionsListPage />} />
                <Route path="/executions/:exeId" element={<ExecutionDetailPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>

            <ActionModals />
            <ToastContainer />
          </div>
        </ApiKeyGate>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
