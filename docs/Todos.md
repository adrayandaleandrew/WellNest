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

- [ ] Setup monorepo structure
- [ ] Add docs folder
- [ ] Add markdown standards
- [ ] Configure .gitignore
- [ ] Create README

---

### Backend Setup

- [ ] Create Firebase project
- [ ] Enable Auth
- [ ] Enable Firestore
- [ ] Base security rules
- [ ] Environment configs

---

### Mobile Setup

- [ ] Initialize Expo app
- [ ] Setup navigation
- [ ] Theme system
- [ ] Feature-based folders

---

### Admin Setup

- [ ] Initialize React app
- [ ] Setup Tailwind
- [ ] Routing system

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

- [ ] Register screen
- [ ] Login screen
- [ ] Validation
- [ ] Firebase Auth integration
- [ ] Session persistence
- [ ] Logout flow
- [ ] Protected routes

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

- [ ] Goal selection
- [ ] Basic info form
- [ ] Health flags
- [ ] Activity level
- [ ] Save to Firestore
- [ ] Profile screen
- [ ] Edit profile

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

- [ ] Create workouts collection
- [ ] Seed workouts

---

### UI

- [ ] Workout list
- [ ] Workout detail
- [ ] Workout mode screen
- [ ] Timer/rest logic
- [ ] Completion screen

---

### Logic

- [ ] Save workout logs

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

- [ ] Logs collection
- [ ] Streaks collection
- [ ] Daily log logic
- [ ] Streak calculation
- [ ] Home display

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

- [ ] Meals collection
- [ ] Seed meals
- [ ] Meals list UI
- [ ] Meal detail UI
- [ ] Filters

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

- [ ] Workout card
- [ ] Meal card
- [ ] Streak display
- [ ] Water tracker

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

- [ ] Add weight entry
- [ ] Save logs
- [ ] Graph view
- [ ] History list

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

- [ ] Workout CRUD
- [ ] Meals CRUD
- [ ] User list
- [ ] Basic analytics

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
- [ ] Utility tests

### Integration
- [ ] Auth tests
- [ ] DB tests

### E2E
- [ ] Login flow
- [ ] Workout flow

---

## Acceptance Criteria

- Core flows tested
- No critical bugs

---

---

# ✅ PHASE 10 — POLISH

- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Animations
- [ ] Accessibility review

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

- [ ] CI pipeline
- [ ] Automated tests
- [ ] Staging deploy
- [ ] Production deploy

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