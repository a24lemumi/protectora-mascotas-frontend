## Why

The frontend `js/api.js` register endpoint is set to `/api/register`, but the backend route is actually `/api/auth/register`. This mismatch causes registration requests to fail with a 404 error.

## What Changes

- Change the register endpoint in `js/api.js` from `/api/register` to `/api/auth/register` to match the backend route

## Capabilities

### New Capabilities
- `fix-register-endpoint`: Correct the register API endpoint to match backend routing

### Modified Capabilities

## Impact

- **Code**: `js/api.js` (single line change in register method)
- **API**: Aligns frontend API calls with backend route `/api/auth/register`
- **Frontend**: Fixes user registration functionality
