# Agents.md

## Purpose

Defines how humans and AI agents (e.g., Claude, ChatGPT) must behave in this project.

This project enforces structured, disciplined development.

---

# Core Rules (MANDATORY)

## 1. Always Utilize Markdown Docs

All agents and developers MUST use and follow:

- Coding Best Practices.md
- Software Architecture.md
- QA test automation.md
- Git-conventions.md
- Repo-Standards.md
- Claude.md
- Agents.md
- `backend/functions/.agents/` skill library (see Rule 9)

No exceptions.

If a change conflicts with docs → update docs FIRST, then implement.

---

## 2. Branch Before Task

Before starting ANY task:

1. Create a new branch
2. Then start work

Never code directly on main/dev.

---

## 3. Push After Task

After finishing a task:

1. Commit properly
2. Push branch to GitHub
3. Open PR if applicable

---

# Agent Behavior

AI agents must:

- Respect architecture
- Avoid overengineering
- Follow DRY/KISS/YAGNI
- Prefer simple solutions
- Not introduce new dependencies without justification

---

# Task Execution Flow (MANDATORY — follow in order)

1. **Read all docs** — Read every file in `docs/` and `CLAUDE.md` before generating any plan
2. **Understand requirement** — Clarify scope, ask if architecture/schema changes are needed
3. **Create branch** — `feature/<name>`, `fix/<name>`, or `chore/<name>` before writing any code
4. **Implement** — Follow all architecture, patterns, and quality rules
5. **Test** — Run relevant unit/E2E tests
6. **Check against docs** — Verify every change complies with all docs in `docs/`; fix anything that conflicts
7. **Push branch** — Push only if docs check passes
8. **User merges manually** — Never merge, never auto-merge; the user handles merging and pulling

---

---

# Rule 9 — Use `.agents` Skill Library (MANDATORY)

The project ships a curated skill library at `backend/functions/.agents/skills/`.

**When to reference:**

| Phase | Action |
|-------|--------|
| Before planning | Read relevant SKILL.md files for any mobile/RN work |
| During implementation | Check rules in `vercel-react-native-skills/rules/` against code being written |
| After implementation | Run compliance check — verify finished code against all applicable rules |

**Skills and what they cover:**

| Skill | When to Use |
|-------|-------------|
| `vercel-react-native-skills` | Any React Native / Expo code — rendering, lists, UI, state, navigation, styling |
| `react-native-architecture` | Project structure, navigation patterns, native module integration, EAS builds |
| `react-native-best-practices` | FPS, TTI, bundle size, memory leaks, re-renders, Hermes optimisations |
| `react-native-design` | Styling patterns, Reanimated, React Navigation setup |
| `mobile-android-design` | Material Design 3 / Android-specific UI (context only — app uses RN, not Compose) |
| `mobile-ios-design` | iOS HIG / SwiftUI patterns (context only — app uses RN, not SwiftUI) |

**Critical rules from `vercel-react-native-skills` (always check these):**

- `rendering-no-falsy-and` — CRITICAL: never `{value && <Component />}` with falsy string/number
- `rendering-text-in-text-component` — CRITICAL: strings must be inside `<Text>`
- `ui-safe-area-scroll` — use `contentInsetAdjustmentBehavior="automatic"` where applicable
- `ui-scrollview-content-inset` — use `contentInset` not `paddingBottom` for dynamic scroll spacing
- `ui-styling` — use `StyleSheet.create`, `gap`, `borderCurve: 'continuous'`
- `ui-pressable` — use `Pressable`, never `TouchableOpacity`
- `react-state-dispatcher` — use `setState(prev => ...)` when next state depends on current

---

# Philosophy

Discipline > Speed
Consistency > Cleverness
Clarity > Complexity