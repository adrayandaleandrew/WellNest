# Security Best Practices

## Purpose

Defines mandatory security standards for this project.

Goals:

- Protect user data  
- Prevent common vulnerabilities  
- Enforce secure development habits  
- Reduce risk in production  

Security is not optional.  
Security is part of quality.

---

# Core Security Principles

## 1. Least Privilege

Give minimum access required.

Examples:
- Users access only their data  
- Admin rights limited to admins  
- Services scoped narrowly  

---

## 2. Defense in Depth

Do not rely on a single protection layer.

Use:
- Auth rules  
- Backend validation  
- Secure configs  
- Monitoring  

---

## 3. Secure by Default

Default state must be secure.

Example:
- Private data not public  
- Strict rules first, then relax if needed  

---

# Authentication & Authorization

## Rules

- Use trusted auth providers (e.g., Firebase Auth)
- Never build custom auth from scratch
- Enforce strong password rules
- Use email verification where possible

---

## Session Security

- Use secure tokens
- Expire sessions appropriately
- Re-auth for sensitive actions

---

## Authorization

Always verify:

- User identity
- User permissions
- Resource ownership

Never trust client-side checks alone.

---

# Data Protection

## In Transit

Always use HTTPS.

No exceptions.

---

## At Rest

Sensitive data must be encrypted by provider.

Examples:
- Database encryption
- Secure storage on device

---

## Sensitive Data Rules

Never store:
- Plain-text passwords
- Full payment details
- Private health info without need

Minimize collected data.

---

# Secrets Management

## Never commit secrets

Do NOT store in repo:
- API keys
- Tokens
- Credentials
- Private configs

---

## Use

- Environment variables
- Secret managers
- CI/CD secrets

---

# Input Validation

Validate ALL inputs.

Server-side validation is mandatory.

Check for:
- Type
- Length
- Format
- Range

---

## Prevent

- Injection attacks
- Malformed data
- Unexpected payloads

---

# API Security

## Rules

- Auth required for protected endpoints
- Rate limit APIs
- Validate requests
- Sanitize inputs

---

## Never trust client data

Client input = untrusted.

Always verify server-side.

---

# Database Security

## Access Rules

Enforce:
- User-level access control
- Role-based permissions

---

## Firestore Example Principles

Users can:
- Read/write own data only
- Not access others' data
- Not escalate privileges

---

# Logging & Monitoring

Log:
- Errors
- Auth attempts
- Suspicious activity

Do NOT log:
- Passwords
- Tokens
- Personal data

---

# Dependency Security

Only use:
- Maintained libraries
- Trusted sources
- Actively updated packages

---

## Regularly

- Update dependencies
- Remove unused packages
- Audit vulnerabilities

---

# Secure Coding Practices

Avoid:
- Hardcoded secrets
- Magic tokens
- Unsafe eval/dynamic code

Prefer:
- Parameterized queries
- Typed data
- Explicit checks

---

# Mobile App Security

## Secure Storage

Use secure storage for:
- Tokens
- Sensitive preferences

Never use plain AsyncStorage for secrets.

---

## Obfuscation

For production builds:
- Minify code
- Hide sensitive logic when possible

---

# CI/CD Security

- Protect pipelines
- Restrict access
- Secure secrets
- Require reviews before merge

---

# Access Control

## Principle

Not everyone needs access to everything.

---

## Enforce

- Role-based access
- Environment separation
- Production access limits

---

# Incident Response

If breach suspected:

1. Contain
2. Investigate
3. Patch
4. Document
5. Prevent recurrence

---

# Code Review Security Checklist

Check for:
- Secret leaks
- Input validation
- Auth checks
- Unsafe logic
- Over-permissions

---

# Developer Responsibilities

Every developer must:
- Follow this doc
- Report vulnerabilities
- Fix security issues quickly

---

# Golden Rules

Never trust input  
Never expose secrets  
Never skip validation  
Never ignore security warnings  

---

# Final Philosophy

Security is a feature.  
A secure app earns trust.  
Trust keeps users.