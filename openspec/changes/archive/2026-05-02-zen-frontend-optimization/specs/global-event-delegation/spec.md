## ADDED Requirements

### Requirement: Global Event Delegation with data-attributes
The system SHALL eliminate multiple `addEventListener` calls and use a single listener on `document` that handles clicks via `data-action` attributes.

#### Scenario: Single global click listener
- **WHEN** any element with `data-action="login"` is clicked
- **THEN** the global listener SHALL handle it without per-element listeners

#### Scenario: Navigation via data-action
- **WHEN** element with `data-action="navigate" data-target="#catalog"` is clicked
- **THEN** the system SHALL navigate to `#catalog`
