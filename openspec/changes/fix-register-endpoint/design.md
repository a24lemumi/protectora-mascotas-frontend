## Context

The frontend SPA has a register function in `js/api.js` that calls `/api/register`, but the backend route is actually `/api/auth/register` (as defined in `public/index.php` line 22). This causes registration requests to fail with a 404 error.

## Goals / Non-Goals

**Goals:**
- Correct the register endpoint in `js/api.js` from `/api/register` to `/api/auth/register`

**Non-Goals:**
- No other API endpoint changes
- No backend modifications

## Decisions

1. **Single line change in api.js**
   - **Decision**: Change line 50 from `return apiRequest('/api/register', {` to `return apiRequest('/api/auth/register', {`
   - **Rationale**: Simple, targeted fix to align with backend routing
   - **Alternative considered**: Creating a constant for API routes - rejected as overkill for a single fix

## Risks / Trade-offs

- **None significant** - This is a simple endpoint path correction with no side effects
