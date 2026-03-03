# WellNest

A mobile-first health and fitness app designed for beginners and health-conscious individuals. WellNest provides simple workouts, healthy meal guidance, progress tracking, and habit-building tools — without the complexity or pressure of hardcore fitness apps.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile App | React Native (Expo), TypeScript |
| Admin Panel | React, Tailwind CSS, TypeScript |
| Backend | Firebase Cloud Functions |
| Database | Firestore (NoSQL) |
| Auth | Firebase Authentication |
| Testing | Jest (unit), Playwright (E2E) |

---

## Project Structure

```
WellNest/
├── mobile/                 # React Native (Expo) app
│   └── src/
│       ├── assets/         # Images, fonts, icons
│       ├── components/     # Reusable UI components
│       ├── constants/      # App-wide constants
│       ├── hooks/          # Custom React hooks
│       ├── navigation/     # Navigation setup
│       ├── screens/        # Screen components
│       ├── services/       # Firebase & API calls
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
│
├── admin/                  # Admin panel (React)
│   └── src/
│       ├── components/     # Admin UI components
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Admin pages
│       ├── services/       # API service layer
│       ├── types/          # TypeScript types
│       └── utils/          # Helpers
│
├── backend/                # Firebase backend
│   ├── firestore/          # Security rules & schemas
│   ├── functions/          # Cloud Functions
│   │   └── src/
│   └── notifications/      # Push notification configs
│
├── tests/                  # Test suite
│   ├── unit/               # Unit tests
│   └── e2e/                # End-to-end tests
│
└── docs/                   # Project documentation
```

The project follows a **feature-based** folder structure. Code is grouped by feature, not by file type.

---

## Architecture

```
UI  -->  Service Layer  -->  Firebase
```

- The UI never calls Firebase directly.
- All data access goes through the service layer.
- Firestore security rules enforce user-level access control.

---

## Core Features

- **Authentication** — Register, login, session persistence, protected routes
- **Onboarding & Profile** — Goal selection, health flags, activity level, editable profile
- **Workouts** — Browse workouts, workout mode with timer/rest, completion tracking
- **Meals** — Meal list with filters, meal detail view
- **Logs & Streaks** — Daily logging, streak calculation, home display
- **Weight Tracking** — Weight entries, graph trends, history
- **Home Dashboard** — Workout card, meal card, streak display, water tracker
- **Admin Panel** — Workout/meal CRUD, user list, basic analytics

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- Expo CLI
- Firebase CLI
- A Firebase project with Auth and Firestore enabled

### Mobile App

```bash
cd mobile
npm install
npx expo start
```

### Admin Panel

```bash
cd admin
npm install
npm run dev
```

### Backend (Cloud Functions)

```bash
cd backend/functions
npm install
firebase emulators:start
```

---

## Development Workflow

1. **Create a branch** before starting any work

   ```
   feature/<task-name>
   fix/<bug-name>
   chore/<maintenance-task>
   ```

2. **Implement** following the standards in `docs/`

3. **Commit** using conventional commits

   ```
   feat: add workout timer
   fix: correct streak calculation
   refactor: simplify auth logic
   docs: update architecture doc
   ```

4. **Push** the branch and open a PR

---

## Branch Strategy

| Branch | Environment | Purpose |
|--------|-------------|---------|
| `main` | Production | Stable releases only |
| `develop` | Staging | Pre-production testing |
| `feature/*` | Development | Active feature work |

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `workout-timer.ts` |
| Components | PascalCase | `WorkoutTimer` |
| Variables | camelCase | `currentStreak` |

---

## Testing

- **Unit tests** — Utilities and business logic
- **Integration tests** — Services and API calls
- **E2E tests** — Login flow, workout flow, logging progress

```bash
cd tests
npm test              # Unit tests
npx playwright test   # E2E tests
```

Coverage goal: 70-80%. Quality over quantity.

---

## Documentation

All project standards and guidelines live in `docs/`:

| Document | Purpose |
|----------|---------|
| [Software Architecture](docs/SoftwareArchitecture.md) | Tech stack, data flow, folder philosophy |
| [Code Best Practices](docs/Code-Best-Practices.md) | DRY, KISS, YAGNI, SOLID, code style |
| [Git Conventions](docs/Git-conventions.md) | Branching, commits, PR standards |
| [Repo Standards](docs/Repo-Standards.md) | Naming, structure, dependency rules |
| [QA & Test Automation](docs/QA-TestAutomation.md) | Test levels, coverage, automation scope |
| [DevOps & CI/CD](docs/DevOps-CICD.md) | Environments, pipeline, deployment |
| [Security Best Practices](docs/SecurityBestPractices.md) | Auth, data protection, input validation |
| [Agents](docs/Agents.md) | Rules for developers and AI agents |
| [Todos](docs/Todos.md) | Full task roadmap and specification |

**Read the docs before contributing.** If a change conflicts with the docs, update the docs first, then implement.

---

## Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Foundation & project setup | Complete |
| 1 | Authentication | Complete |
| 2 | Onboarding & profile | Complete |
| 3 | Workout module | Complete |
| 4 | Logs & streaks | Complete |
| 5 | Meals | Complete |
| 6 | Home dashboard | Complete |
| 7 | Weight tracking | Complete |
| 8 | Admin panel | Complete |
| 9 | Testing | Complete |
| 10 | Polish (loading/error/empty states, animations, a11y) | Complete |
| 11 | Beta launch | Complete |
| 12 | CI/CD pipeline | Complete |
| 13 | Mobile responsive UI (safe area & keyboard fixes) | Complete |
| 14 | Bug fixes (post-phase 13) | Complete |
| 15 | Bug fixes (post-phase 14) | Complete |
| 16 | Bug fixes (post-phase 15) | Complete |
| 17 | Mobile E2E tests | Complete |
| 18 | Documentation & rules cleanup | Complete |

See [Todos.md](docs/Todos.md) for the full specification and task breakdown.

---

## License

Private — All rights reserved.
