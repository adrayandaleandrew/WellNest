import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/login/pages/login-page';
import DashboardPage from '../features/dashboard/pages/dashboard-page';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
