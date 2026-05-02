## ADDED Requirements

### Requirement: Simplified API with Direct Data Return
The `js/api.js` SHALL return clean data directly, avoiding repetitive `response.data` checks in `app.js`.

#### Scenario: API returns clean data
- **WHEN** `API.getPets()` is called and succeeds
- **THEN** it SHALL return the pets array directly (not wrapped in `{data: {data: [...]}}`)

#### Scenario: No repetitive checks in app.js
- **WHEN** API methods are called in `app.js`
- **THEN** they SHALL NOT need `.data.data` or similar nested access
