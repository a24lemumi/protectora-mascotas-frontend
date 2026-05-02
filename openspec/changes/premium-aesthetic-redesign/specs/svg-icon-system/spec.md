## ADDED Requirements

### Requirement: Theme toggle SHALL use SVG sun and moon icons
The theme toggle component SHALL display a minimalist SVG sun icon for light mode and SVG moon icon for dark mode, replacing any emoji or text-based icons.

#### Scenario: Sun icon displayed in light mode
- **WHEN** the application is in light mode
- **THEN** the theme toggle displays a minimalist SVG sun icon
- **AND** the icon is crisp at all sizes (16px to 32px)

#### Scenario: Moon icon displayed in dark mode
- **WHEN** the application is in dark mode
- **THEN** the theme toggle displays a minimalist SVG moon icon
- **AND** the icon is crisp at all sizes (16px to 32px)

### Requirement: Action buttons SHALL use SVG icons
All action buttons (favorite, edit, delete, etc.) SHALL use minimalist SVG icons instead of emojis or generic icon fonts.

#### Scenario: Action buttons with SVG icons
- **WHEN** action buttons are displayed on cards or forms
- **THEN** each button shows a minimalist SVG icon
- **AND** icons are properly sized and aligned with button text if present

### Requirement: SVG icons SHALL be reusable React components
SVG icons SHALL be implemented as reusable React components with customizable size and color props.

#### Scenario: Icon component customization
- **WHEN** a developer uses an SVG icon component
- **THEN** they can pass size and color props to customize the icon
- **AND** the icon renders correctly with the specified properties
