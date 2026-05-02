## ADDED Requirements

### Requirement: Catalog SHALL display pets in 3-column grid layout on desktop
The catalog SHALL use a CSS Grid layout with 3 columns on desktop viewports (≥1024px), 2 columns on tablet (≥768px), and 1 column on mobile (<768px).

#### Scenario: Desktop catalog grid display
- **WHEN** user views the catalog on a desktop viewport (≥1024px)
- **THEN** pets are displayed in a 3-column grid layout with equal spacing

#### Scenario: Tablet catalog grid display
- **WHEN** user views the catalog on a tablet viewport (≥768px and <1024px)
- **THEN** pets are displayed in a 2-column grid layout

#### Scenario: Mobile catalog grid display
- **WHEN** user views the catalog on a mobile viewport (<768px)
- **THEN** pets are displayed in a 1-column grid layout

### Requirement: Catalog SHALL remove "Mascotas Destacadas" section
The "Mascotas Destacadas" section and its horizontal carousel SHALL be completely removed from the catalog page.

#### Scenario: Featured section removal
- **WHEN** user navigates to the catalog page
- **THEN** the "Mascotas Destacadas" section is not displayed
- **AND** the horizontal carousel is not rendered

### Requirement: Catalog SHALL use vertical card layout
The catalog SHALL display pets using vertical (portrait-oriented) cards instead of horizontal cards.

#### Scenario: Vertical card layout in catalog
- **WHEN** pets are displayed in the catalog grid
- **THEN** each pet card uses a vertical layout with image on top and details below
