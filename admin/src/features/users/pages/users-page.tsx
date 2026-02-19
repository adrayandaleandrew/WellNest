import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { UserProfile } from '../../../shared/types/user';

function formatGoals(goals: UserProfile['goals']): string {
  if (!goals?.length) return '—';
  return goals.map((g) => g.replace(/_/g, ' ')).join(', ');
}

function formatActivityLevel(level: UserProfile['activityLevel']): string {
  if (!level) return '—';
  return level.replace(/_/g, ' ');
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const data = snapshot.docs.map((d) => d.data() as UserProfile);
        setUsers(data);
      } catch {
        setError('Failed to load users. Check that your UID is in the admins collection.');
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">Registered user accounts (read-only)</p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {users.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No registered users found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Display Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Goals</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Activity</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Weight (kg)</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u, i) => (
                  <tr key={u.uid ?? i} className="hover:bg-gray-50 transition-colors duration-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{u.displayName || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{u.email || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate" title={formatGoals(u.goals)}>
                      {formatGoals(u.goals)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {formatActivityLevel(u.activityLevel)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.weightKg ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
