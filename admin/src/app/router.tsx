import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../shared/contexts/auth-context';
import ProtectedRoute from '../shared/components/protected-route';
import AdminLayout from '../shared/components/layout/admin-layout';
import LoginPage from '../features/login/pages/login-page';
import DashboardPage from '../features/dashboard/pages/dashboard-page';
import WorkoutsPage from '../features/workouts/pages/workouts-page';
import MealsPage from '../features/meals/pages/meals-page';
import UsersPage from '../features/users/pages/users-page';

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* All admin routes are protected and rendered inside AdminLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
