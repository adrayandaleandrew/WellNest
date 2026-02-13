# Coding Best Practices

---

# Core Principles

## DRY (Don't Repeat Yourself)

- Reuse logic
- Extract shared functions
- Avoid duplicate components

---

## KISS (Keep It Simple)

- Simple code > clever code
- Prefer readability

---

## YAGNI (You Aren't Gonna Need It)

- Don't build future features now
- Build when needed

---

## SOLID

### S — Single Responsibility
One function/component = one job.

### O — Open/Closed
Extend without modifying stable code.

### L — Liskov
Subtypes must behave correctly.

### I — Interface Segregation
Avoid fat interfaces.

### D — Dependency Inversion
Depend on abstractions.

---

# UI/UX Best Practices

- Minimal steps for user actions
- Clear CTAs
- Consistent spacing
- Mobile-first design
- Accessible color contrast
- Feedback for actions
- Loading states
- Error states

---

# Code Style

- Meaningful names
- Small functions
- Early returns
- Avoid deep nesting
- Prefer composition over inheritance

---

# Comments

Comment WHY, not WHAT.

---

# TypeScript

- Never use `any` — always type properly
- Use `interface` or `type` for all data shapes
- Prefer `unknown` over `any` when type is uncertain
- Enable strict mode in `tsconfig.json`
- Use `type` keyword for type-only imports (`import type { ... }`)

---

# Rule

Readable code today > smart code tomorrow.