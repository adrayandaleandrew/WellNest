import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../shared/contexts/auth-context';
import LoginPage from '../features/login/pages/login-page';
import DashboardPage from '../features/dashboard/pages/dashboard-page';
import ProtectedRoute from '../shared/components/protected-route';

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
