import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          WellNest Admin
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Admin login will be implemented in Phase 1.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
