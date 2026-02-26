# TODOS.md — WellNest Software Specification & Task Plan

## Purpose

This document serves as:

- A development specification
- A task checklist
- An execution roadmap
- A source of truth for implementation

It is written for developers and AI agents.

All tasks must follow project markdown standards.

---

# 🚨 GLOBAL MANDATORY RULES

## Rule 1 — Always Use Markdown Docs

Before ANY implementation:

- Review relevant markdown files
- Follow defined standards
- If conflict exists → update docs first

No exceptions.

---

## Rule 2 — Branch Before Work

Before any task:

1. Create branch  
2. Then code  

Format:

feature/<task-name>

---

## Rule 3 — Push After Task

After finishing:

- Commit  
- Push branch  
- Open PR (if applicable)

---

---

# 📌 PRODUCT OVERVIEW

## Product Name
WellNest

## Product Type
Mobile-first health & fitness app with admin panel.

## Target Users

- Beginners in fitness
- Health-conscious individuals
- Filipino and global users
- Users wanting simple health guidance

---

## Core Value Proposition

Provide:

- Simple workouts
- Healthy meal guidance
- Progress tracking
- Habit-building tools

Without:

- Complexity
- Hardcore fitness pressure
- Calorie obsession

---

---

# 🧱 SYSTEM COMPONENTS

1. Mobile App
2. Admin Panel
3. Backend (Firebase)
4. Testing Suite
5. CI/CD Pipeline

---

---

# ✅ PHASE 0 — FOUNDATION

## Objective

Establish stable project setup.

---

## Tasks

### Repo

- [x] Setup monorepo structure
- [x] Add docs folder
- [x] Add markdown standards
- [x] Configure .gitignore
- [x] Create README

---

### Backend Setup

- [x] Create Firebase project
- [x] Enable Auth
- [x] Enable Firestore
- [x] Base security rules
- [x] Environment configs

---

### Mobile Setup

- [x] Initialize Expo app
- [x] Setup navigation
- [x] Theme system
- [x] Feature-based folders

---

### Admin Setup

- [x] Initialize React app
- [x] Setup Tailwind
- [x] Routing system

---

## Done Criteria

- Apps run locally
- Firebase connected
- Navigation works

---

---

# ✅ PHASE 1 — AUTHENTICATION

## Objective

Users can securely sign up and log in.

---

## Tasks

- [x] Register screen
- [x] Login screen
- [x] Validation
- [x] Firebase Auth integration
- [x] Session persistence
- [x] Logout flow
- [x] Protected routes

---

## Acceptance Criteria

- User can register
- User can log in
- Session persists
- Unauthorized access blocked

---

---

# ✅ PHASE 2 — ONBOARDING & PROFILE

## Objective

Collect user data for personalization.

---

## Tasks

- [x] Goal selection
- [x] Basic info form
- [x] Health flags
- [x] Activity level
- [x] Save to Firestore
- [x] Profile screen
- [x] Edit profile

---

## Acceptance Criteria

- Data saved correctly
- Profile editable
- Validation works

---

---

# ✅ PHASE 3 — WORKOUT MODULE

## Objective

Enable users to complete workouts.

---

## Tasks

### Data

- [x] Create workouts collection
- [x] Seed workouts

---

### UI

- [x] Workout list
- [x] Workout detail
- [x] Workout mode screen
- [x] Timer/rest logic
- [x] Completion screen

---

### Logic

- [x] Save workout logs

---

## Acceptance Criteria

- Workout flows smoothly
- Timer works
- Completion saved

---

---

# ✅ PHASE 4 — LOGS & STREAKS

## Objective

Track user consistency.

---

## Tasks

- [x] Logs collection
- [x] Streaks collection
- [x] Daily log logic
- [x] Streak calculation
- [x] Home display

---

## Acceptance Criteria

- Logs saved per day
- Streaks accurate

---

---

# ✅ PHASE 5 — MEALS

## Objective

Provide diet guidance.

---

## Tasks

- [x] Meals collection
- [x] Seed meals
- [x] Meals list UI
- [x] Meal detail UI
- [x] Filters

---

## Acceptance Criteria

- Meals display correctly
- Filters work

---

---

# ✅ PHASE 6 — HOME DASHBOARD

## Objective

Central daily hub.

---

## Tasks

- [x] Workout card
- [x] Meal card
- [x] Streak display
- [x] Water tracker

---

## Acceptance Criteria

- Data loads correctly
- UI responsive

---

---

# ✅ PHASE 7 — WEIGHT TRACKING

## Objective

Show measurable progress.

---

## Tasks

- [x] Add weight entry
- [x] Save logs
- [x] Graph view
- [x] History list

---

## Acceptance Criteria

- Weight stored
- Graph displays trends

---

---

# ✅ PHASE 8 — ADMIN PANEL

## Objective

Content management.

---

## Tasks

- [x] Workout CRUD
- [x] Meals CRUD
- [x] User list
- [x] Basic analytics

---

## Acceptance Criteria

- Admin can manage data
- Changes reflect in app

---

---

# ✅ PHASE 9 — TESTING

## Objective

Ensure reliability.

---

## Tasks

### Unit
- [x] Utility tests (validation, workout-utils, meal-utils, profile-utils)

### Integration
- [x] Auth tests (auth-service — Firebase mocked)
- [x] DB tests (streak/log-service — Firestore mocked)

### E2E
- [x] Login flow (admin-login.spec.ts)
- [x] Workout flow (admin-workouts.spec.ts)

---

## Acceptance Criteria

- Core flows tested
- No critical bugs

---

---

# ✅ PHASE 10 — POLISH

- [x] Loading states
- [x] Error states
- [x] Empty states
- [x] Animations
- [x] Accessibility review

---

---

# ✅ PHASE 11 — BETA LAUNCH

- [x] Beta build
- [x] Tester group
- [x] Feedback collection
- [x] Bug fixes

---

---

# ✅ PHASE 12 — CI/CD

- [x] CI pipeline
- [x] Automated tests
- [x] Staging deploy
- [x] Production deploy

---

---

# 🔧 PHASE 13 — MOBILE RESPONSIVE UI (SAFE AREA & KEYBOARD FIXES)

## Objective

Fix cross-cutting safe area and keyboard avoidance issues discovered in post-launch audit. Ensure all screens handle notches, Dynamic Islands, home indicators, and software keyboards correctly on modern iOS and Android devices.

---

## Root Cause Summary

| Problem | Effect |
|---|---|
| Missing `SafeAreaView` | Content overlaps notch / Dynamic Island / home indicator |
| Missing `KeyboardAvoidingView` | Keyboard covers text inputs |

**Rule — stack-navigator screens** (with nav header): only `edges={['bottom']}` needed.
**Rule — headerless screens** (auth, onboarding): full `SafeAreaView` (all edges).

---

## Tasks

- [x] Fix `login-screen.tsx` — wrap `KeyboardAvoidingView` with `SafeAreaView` (all edges)
- [x] Fix `register-screen.tsx` — same pattern as login
- [x] Fix `basic-info-screen.tsx` — add `KeyboardAvoidingView`, remove `paddingBottom: 300` hack
- [x] Fix `edit-profile-screen.tsx` — add `SafeAreaView edges={['bottom']}` + `KeyboardAvoidingView`
- [x] Fix `settings-screen.tsx` — add `SafeAreaView edges={['bottom']}` + `ScrollView`
- [x] Fix `profile-screen.tsx` — add `SafeAreaView edges={['bottom']}`
- [x] Fix `feedback-screen.tsx` — add `KeyboardAvoidingView` (already has `SafeAreaView`)
- [x] Fix `workout-complete-screen.tsx` — replace `minWidth: 130` with `flex: 1` on `statCard`

---

## Skills Referenced

- `vercel-react-native-skills` — `ui-safe-area-scroll`, `ui-scrollview-content-inset`, `ui-styling`
- `mobile-design/platform-ios.md` — safe area anatomy, notch/Dynamic Island handling
- `mobile-design/platform-android.md` — edge-to-edge display (Android 15+)
- `mobile-design/touch-psychology.md` — touch target ≥ 44px

---

## Acceptance Criteria

- iPhone SE (375pt) — no content clipped at top or bottom
- iPhone 15 Pro (Dynamic Island) — content below Dynamic Island, above home indicator
- Tap any text input — keyboard slides in, input stays visible
- Rotate to landscape — content still scrollable, not clipped

---
# ✅ PHASE 14 — BUG FIXES (POST-PHASE-13 TESTING)

## Objective

Fix 3 bugs discovered during Expo test session on a physical Android device (2026-02-22).

Context: Post-Phase-13 testing revealed these issues. Targeted fixes only — no new features, no refactoring.

---

## Bug Inventory

| # | Screen | Symptom |
|---|---|---|
| 1 | Workout Mode | Error toast: "Cannot update a component (WorkoutMo...)" |
| 2 | Meal Detail | Nav header shows generic "Meal Details"; in-content meal name is redundant |
| 3 | Home | "Hey, John 👋" greeting clipped behind the navigation header |

---

## Bug Details

### Bug 1 — Workout Mode: render-time navigation causes React warning

**File:** `mobile/src/features/workout/screens/workout-mode-screen.tsx`

**Root cause:** `navigation.replace()` is called directly inside the render function when `session.phase === 'complete'`. React prohibits updating a component (the navigator) while rendering another (WorkoutModeScreen), causing the error toast.

**Fix:** Move the navigation call into a `useEffect` that fires when `session.phase` changes.

```tsx
// DELETE this block from render:
if (session.phase === 'complete') {
  const summary = session.getSummary();
  navigation.replace('WorkoutComplete', { summary, workoutId: workout.id });
  return null;
}

// ADD after all hook calls, before any conditional returns:
useEffect(() => {
  if (session.phase === 'complete') {
    navigation.replace('WorkoutComplete', {
      summary: session.getSummary(),
      workoutId: workout.id,
    });
  }
}, [session.phase]);
```

---

### Bug 2 — Meal Detail: generic header title / redundant content name

**File:** `mobile/src/features/meal/screens/meal-detail-screen.tsx`

**Root cause:** `root-navigator.tsx` has a static `title: 'Meal Details'`. The content body also renders `<Text style={styles.name}>{meal.name}</Text>` — creating a mismatch between the generic header and the specific in-content name.

**Fix:**
1. Destructure `navigation` from props (currently only `route` is used).
2. Add `useEffect(() => { navigation.setOptions({ title: meal.name }); }, [meal.name, navigation])` so the header dynamically shows the specific meal name.
3. Remove `<Text style={styles.name}>{meal.name}</Text>` from JSX — the header now carries the name. Content begins with the description.
4. Remove `styles.name` from `StyleSheet.create`.

> Note: No changes to `root-navigator.tsx` — `'Meal Details'` remains as a loading fallback.

---

### Bug 3 — Home: greeting clipped under navigation header

**File:** `mobile/src/features/home/screens/home-screen.tsx`

**Root cause:** `SafeAreaView` uses default edges (all four). On Android inside a native stack navigator with `headerShown: true`, the top safe area inset only accounts for the status bar (~24dp), not the navigation header (~56dp). Content ends up partially behind the header.

**Fix:** Change to `edges={['bottom']}` — the correct pattern for all stack-navigator screens (established in Phase 13).

```tsx
// Before
<SafeAreaView style={styles.container}>

// After
<SafeAreaView style={styles.container} edges={['bottom']}>
```

---

## Tasks

- [x] Fix `workout-mode-screen.tsx` — move `navigation.replace()` from render into `useEffect`
- [x] Fix `meal-detail-screen.tsx` — dynamic header title via `navigation.setOptions`, remove in-content name text
- [x] Fix `home-screen.tsx` — change `SafeAreaView` to `edges={['bottom']}` (stack-nav pattern)

---

## Acceptance Criteria

- Completing a workout shows WorkoutComplete screen with no error toast
- Meal detail header shows specific meal name (not "Meal Details")
- Home screen greeting fully visible below navigation header on Android

---

# ✅ PHASE 15 — BUG FIXES (POST-PHASE-14 TESTING)

## Objective

Fix 2 bugs discovered during post-Phase-14 device testing. Targeted fixes only — no new features, no refactoring.

---

## Bug Inventory

| # | Screen | Symptom |
|---|---|---|
| 1 | Workout Mode (rest phase) | Error toast: "Cannot update a component" still firing during rest timer |
| 2 | Home | Redundant "WellNest" navigation header visible above custom greeting |

---

## Root Cause Summary

### Bug 1 — use-timer.ts: impure state updater

**File:** `mobile/src/shared/hooks/use-timer.ts`

**Root cause:** `clearTimer()`, `setIsRunning(false)`, and `onCompleteRef.current?.()` were called inside the `setSecondsLeft` functional updater body. React's concurrent mode contract requires updaters to be pure — calling external setState or side effects from within an updater triggers "Cannot update a component while rendering a different component".

**Fix:** Pure updater + `completedRef` flag + `useEffect` that fires after React commits `secondsLeft = 0`.

---

### Bug 2 — Home screen: redundant navigation header

**File:** `mobile/src/app/navigation/root-navigator.tsx` + `mobile/src/features/home/screens/home-screen.tsx`

**Root cause:** Home had `title: 'WellNest'` in navigator options, producing a redundant header above the in-content greeting. Phase 14's `edges={['bottom']}` fix made the greeting visible but left the nav bar intact.

**Fix:** `headerShown: false` on Home stack screen (consistent with WorkoutMode and WorkoutComplete). SafeAreaView reverts to full edges (all four) since headerless screens must handle the top status bar inset themselves.

---

## Tasks

- [x] Fix `use-timer.ts` — pure updater + `completedRef` guard + completion `useEffect`
- [x] Fix `root-navigator.tsx` — `headerShown: false` on Home screen
- [x] Fix `home-screen.tsx` — restore full `SafeAreaView` edges (headerless screen pattern)

---

## Skills Referenced

- `vercel-react-native-skills` — Priority 5 (State purity), Priority 6 (Rendering rules)
- `vercel-react-native-skills/rules/rendering-no-falsy-and.md` — side effects must not occur during render/updater
- `mobile-design/platform-android.md` — Top App Bar / headerless screen safe area rules

---

## Acceptance Criteria

- Rest phase timer counts down → no error toast → moves to next exercise
- Completing all sets → WorkoutComplete screen with no error toast at any point
- Home screen shows no "WellNest" navigation header; greeting visible directly below status bar
- No content clipped top or bottom on Home

---

# ✅ PHASE 16 — BUG FIXES (POST-PHASE-15 TESTING)

## Objective

Fix 2 bugs discovered during post-Phase-15 device testing on a Realme GT Master Edition (punch-hole camera, top-left). Targeted fixes only — no new features, no refactoring.

---

## Bug Inventory

| # | Component | Symptom |
|---|---|---|
| 1 | Back button (all screens) | Visually hidden behind punch-hole camera on Realme GT Master Edition |
| 2 | Meal Detail header | Brief "Meal Details" flash before meal name on slower devices |

---

## Root Cause Summary

### Bug 1 — Back button hidden by punch-hole camera

**Files:** `mobile/App.tsx`, `mobile/src/app/navigation/root-navigator.tsx`

**Root cause (A):** No explicit `SafeAreaProvider` at the app root. React Navigation's internal `SafeAreaProviderCompat` may not report a non-zero left inset for OEM display cutouts.

**Root cause (B):** `MainNavigator` never applied `useSafeAreaInsets().left` to `headerLeftContainerStyle`, so the back button rendered at x=0 — behind the camera hole.

**Fix:** Add `SafeAreaProvider` with `initialWindowMetrics` to `App.tsx`. Add `headerLeftContainerStyle: { paddingLeft: insets.left }` to `MainNavigator` screenOptions.

---

### Bug 2 — Meal Detail header flash

**Files:** `mobile/src/app/navigation/root-navigator.tsx`, `mobile/src/features/meal/screens/meal-detail-screen.tsx`

**Root cause:** Phase 14's `useEffect + setOptions` pattern runs AFTER the first render, causing a one-frame "Meal Details" flash on slower devices.

**Fix:** Replace static title with an `options` function that reads `route.params.meal.name` synchronously at navigation time. Remove now-redundant `useEffect` from the screen component.

---

## Tasks

- [x] Fix `App.tsx` — wrap app in `SafeAreaProvider` with `initialWindowMetrics`
- [x] Fix `root-navigator.tsx` — add `headerLeftContainerStyle: { paddingLeft: insets.left }` to `MainNavigator` screenOptions
- [x] Fix `root-navigator.tsx` — replace static `MealDetail` title with `options={({ route }) => ({ title: route.params.meal.name })}`
- [x] Fix `meal-detail-screen.tsx` — remove `useEffect` + `navigation` prop (navigator handles title)

---

## Skills Referenced

- `vercel-react-native-skills` — `ui-safe-area-scroll`, rendering rules
- `mobile-design/platform-android.md` — Display cutout / punch-hole camera handling

---

## Acceptance Criteria

- Back button (←) visible to the right of the punch-hole camera on Realme GT Master Edition
- Meal Detail header immediately shows specific meal name — no "Meal Details" flash
- `insets.left = 0` on devices without display cutout — no visual change to header alignment
- All other screens unaffected; Home screen (headerShown: false) unaffected

---

# 🔧 PHASE 17 — MOBILE E2E TESTS

## Objective

Implement the three mobile E2E flows required by QA-TestAutomation.md using Maestro.
Tests run locally against a connected Android device or emulator.

---

## Tasks

- [x] Add testIDs to `login-screen.tsx` (email + password inputs)
- [x] Add testIDs to `home-screen.tsx` (root, streak count, see-all-workouts)
- [x] Create `tests/e2e/mobile/login-flow.yaml`
- [x] Create `tests/e2e/mobile/workout-flow.yaml`
- [x] Create `tests/e2e/mobile/logging-progress-flow.yaml`
- [x] Add `test:e2e:mobile` script to root `package.json`
- [x] Update `.env.example` with Maestro env vars

---

## Acceptance Criteria

- Login flow passes on a physical Android device
- Workout flow passes: navigates list → detail → mode → quit
- Logging progress flow passes: completes workout → home shows "logged today"
- No existing tests broken

---

# 📌 NON-GOALS (FOR NOW)

- AI coaching
- Social features
- Advanced calorie tracking
- Marketplace features

---

---

# 🎯 MVP SUCCESS CRITERIA

MVP is successful if:

- Auth works
- Workouts usable
- Logs & streaks reliable
- Meals helpful
- No critical bugs
- Smooth UX

---

---

# 🧠 FINAL PRINCIPLE

Ship simple.  
Ship stable.  
Improve iteratively.

A working product beats a perfect plan.