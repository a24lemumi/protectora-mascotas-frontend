## ADDED Requirements

### Requirement: Atomic CSS with data-attributes
The system SHALL move visual logic (like `hidden` class, colors) entirely to CSS, letting JS only change states or `data-attributes`.

#### Scenario: Hidden state via data-attribute
- **WHEN** user is logged out
- **THEN** logout button SHALL have `data-state="logged-out"` and CSS rule `[data-state="logged-out"] .logout-btn { display: none; }`

#### Scenario: Theme via data-attribute
- **WHEN** theme is changed
- **THEN** JS SHALL only set `data-theme` attribute, CSS handles all visual changes
