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

- [ ] Beta build
- [ ] Tester group
- [ ] Feedback collection
- [ ] Bug fixes

---

---

# ✅ PHASE 12 — CI/CD

- [x] CI pipeline
- [x] Automated tests
- [x] Staging deploy
- [x] Production deploy

---

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