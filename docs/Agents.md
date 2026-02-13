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

# Task Execution Flow

1. Understand requirement
2. Check architecture
3. Check standards
4. Create branch
5. Implement
6. Test
7. Push

---

# Philosophy

Discipline > Speed  
Consistency > Cleverness  
Clarity > Complexity