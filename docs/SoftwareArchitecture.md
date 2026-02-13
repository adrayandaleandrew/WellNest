# Software Architecture

---

# Architecture Style

Frontend:
- React Native (Expo)

Backend:
- Firebase

Database:
- Firestore (NoSQL)

---

# Architecture Principles

- Feature-based structure
- Separation of concerns
- Modular components
- Stateless UI where possible

---

# Folder Philosophy

Group by feature, not by type.

Good:
features/workout/

Bad:
components/, utils/, screens/ dumping ground

---

# Data Flow

UI → Service Layer → Firebase

Never call Firebase directly from UI.

---

# Scalability

- Denormalize for reads
- Cache where needed
- Avoid deep nesting

---

# Security

- Firestore rules enforced
- User can only access own data

---

# Golden Rule

Simple architecture that scales  
> complex architecture that breaks.