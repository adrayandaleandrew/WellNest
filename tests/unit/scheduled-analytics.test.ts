import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.hoisted runs before vi.mock factories, so these refs are available inside the factories
const { mockCountGet, mockSummarySet, getHandler, setHandler } = vi.hoisted(() => {
  const mockCountGet = vi.fn();
  const mockSummarySet = vi.fn();
  let _handler: (() => Promise<void>) | undefined;
  return {
    mockCountGet,
    mockSummarySet,
    getHandler: () => _handler,
    setHandler: (fn: () => Promise<void>) => { _handler = fn; },
  };
});

// Mock the scheduler trigger — captures the handler when the module is imported
vi.mock('firebase-functions/v2/scheduler', () => ({
  onSchedule: (_schedule: string, fn: () => Promise<void>) => {
    setHandler(fn);
    return {};
  },
}));

// collection() branches on name so count queries and the summary write use separate fns
vi.mock('firebase-admin/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn((name: string) => {
      if (name === 'analytics') {
        return { doc: vi.fn(() => ({ set: mockSummarySet })) };
      }
      return { count: vi.fn(() => ({ get: mockCountGet })) };
    }),
    collectionGroup: vi.fn(() => ({
      count: vi.fn(() => ({ get: mockCountGet })),
    })),
  })),
}));

// Import triggers module evaluation, which calls onSchedule(schedule, handler)
import '../../backend/functions/src/scheduled-analytics';

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// scheduledAnalytics
// ---------------------------------------------------------------------------
describe('scheduledAnalytics', () => {
  it('writes summary with correct counts', async () => {
    // Promise.all calls mockCountGet 4 times in order: users, workouts, meals, workoutLogs
    mockCountGet
      .mockResolvedValueOnce({ data: () => ({ count: 42 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 15 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 30 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 200 }) });

    await getHandler()!();

    expect(mockSummarySet).toHaveBeenCalledOnce();
    expect(mockSummarySet).toHaveBeenCalledWith(
      expect.objectContaining({
        totalUsers: 42,
        totalWorkouts: 15,
        totalMeals: 30,
        totalWorkoutLogs: 200,
      })
    );
  });

  it('summary contains lastUpdated as an ISO date string', async () => {
    mockCountGet.mockResolvedValue({ data: () => ({ count: 0 }) });

    await getHandler()!();

    const written = mockSummarySet.mock.calls[0][0] as { lastUpdated: string };
    expect(written.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('handles zero counts gracefully', async () => {
    mockCountGet.mockResolvedValue({ data: () => ({ count: 0 }) });

    await getHandler()!();

    expect(mockSummarySet).toHaveBeenCalledWith(
      expect.objectContaining({
        totalUsers: 0,
        totalWorkouts: 0,
        totalMeals: 0,
        totalWorkoutLogs: 0,
      })
    );
  });
});
