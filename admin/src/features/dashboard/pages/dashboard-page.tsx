import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mb-8 text-gray-500">
          Admin dashboard will be built in Phase 8.
        </p>
        <button
          onClick={() => navigate('/')}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
