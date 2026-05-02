## ADDED Requirements

### Requirement: Scroll-driven animations for pet cards
Pet cards SHALL appear with fade-in and slide-up animations as they enter the viewport using native CSS scroll-driven animations (`animation-timeline: view()`).

#### Scenario: Card appears on scroll
- **WHEN** a pet card scrolls into the viewport
- **THEN** it SHALL animate from `opacity: 0; transform: translateY(30px)` to `opacity: 1; transform: translateY(0)` over the view timeline

#### Scenario: Fallback for unsupported browsers
- **WHEN** the browser does not support `animation-timeline`
- **THEN** the system SHALL use Intersection Observer API to trigger the animation

### Requirement: Scroll snap catalog
The pet catalog SHALL implement scroll snap effects for horizontal or grid scrolling using CSS `scroll-snap-type`.

#### Scenario: Horizontal scroll snap
- **WHEN** user scrolls horizontally through featured pets
- **THEN** the scroll SHALL snap to each pet card using `scroll-snap-align: start`

#### Scenario: Scroll snap container
- **WHEN** the catalog container has `scroll-snap-type: x mandatory`
- **THEN** scrolling SHALL always stop at a snap point
