import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

// Inline SVG icons — no icon library dependency
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconWorkout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M3 9h3M18 9h3M3 15h3M18 15h3M6 9h12M6 15h12" />
    </svg>
  );
}

function IconMeals() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconFeedback() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { to: '/workouts', label: 'Workouts', icon: <IconWorkout /> },
  { to: '/meals', label: 'Meals', icon: <IconMeals /> },
  { to: '/users', label: 'Users', icon: <IconUsers /> },
  { to: '/feedback', label: 'Feedback', icon: <IconFeedback /> },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar — same bg-gray-50 as canvas, separated by border only */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col border-r border-gray-200 bg-gray-50">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900 tracking-tight">WellNest</span>
          <span className="block text-xs text-gray-400 mt-0.5">Admin Panel</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout pinned at bottom */}
        <div className="px-3 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer"
          >
            <IconLogout />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
