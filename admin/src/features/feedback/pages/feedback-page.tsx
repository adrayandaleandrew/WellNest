import { useEffect, useState } from 'react';
import { getFeedback } from '../services/feedback-service';
import type { FeedbackItem } from '../../../shared/types/feedback';

// Renders a star rating string — filled stars in yellow, empty stars in gray
function StarRating({ rating }: { rating: number }) {
  const filled = Math.min(Math.max(Math.round(rating), 0), 5);
  return (
    <span>
      <span className="text-yellow-500">{'★'.repeat(filled)}</span>
      <span className="text-gray-300">{'☆'.repeat(5 - filled)}</span>
    </span>
  );
}

export default function FeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Tracks which feedback messages are expanded (Show more)
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadFeedback() {
      try {
        const data = await getFeedback();
        setItems(data);
      } catch {
        setError(
          'Failed to load feedback. This query requires a Firestore index — check Firebase Console.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadFeedback();
  }, []);

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1>
        <p className="text-sm text-gray-500 mt-0.5">User-submitted feedback (read-only)</p>
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
          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No feedback submitted yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">User ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Rating</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">App Version</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const isExpanded = expanded.has(item.id);
                  const isLong = item.message.length > 80;
                  const displayMessage =
                    isLong && !isExpanded ? item.message.slice(0, 80) + '…' : item.message;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-100">
                      {/* User ID — truncated to 8 chars, full value in title tooltip */}
                      <td
                        className="px-4 py-3 font-mono text-gray-500 text-xs"
                        title={item.userId}
                      >
                        {item.userId.slice(0, 8)}
                      </td>

                      <td className="px-4 py-3">
                        <StarRating rating={item.rating} />
                      </td>

                      <td className="px-4 py-3 text-gray-700 max-w-[320px]">
                        {displayMessage}
                        {isLong && (
                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="ml-1 text-green-600 hover:underline text-xs font-medium"
                          >
                            {isExpanded ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </td>

                      <td className="px-4 py-3 text-gray-500">{item.appVersion || '—'}</td>

                      <td className="px-4 py-3 text-gray-500">
                        {item.createdAt?.toDate().toLocaleDateString() ?? '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
