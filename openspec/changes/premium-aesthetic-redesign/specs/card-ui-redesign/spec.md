## ADDED Requirements

### Requirement: Pet cards SHALL use 3:4 portrait image ratio
Pet card images SHALL display with a 3:4 aspect ratio (portrait orientation) using object-fit: cover.

#### Scenario: Card image displays in 3:4 ratio
- **WHEN** a pet card is rendered in the catalog
- **THEN** the card image container has a 3:4 aspect ratio (75% padding-top technique or aspect-ratio property)
- **AND** the image fills the container with object-fit: cover

#### Scenario: Image cropping with object-fit
- **WHEN** a pet image has different dimensions than 3:4
- **THEN** the image is cropped gracefully using object-fit: cover
- **AND** the focal point remains visible

### Requirement: Pet cards SHALL have soft borders and subtle shadows
Pet cards SHALL feature rounded borders (8px radius), subtle box-shadow, and a clean white or theme-appropriate background.

#### Scenario: Card with soft borders and shadow
- **WHEN** a pet card is displayed
- **THEN** the card has 8px border-radius
- **AND** a subtle box-shadow (e.g., 0 2px 8px rgba(0,0,0,0.08))
- **AND** a clean background matching the theme

### Requirement: Pet cards SHALL have refined hover effects
Pet cards SHALL display a refined hover effect that slightly scales the image (transform: scale(1.05)) with a smooth transition, while the card itself may lift slightly.

#### Scenario: Hover effect on card image
- **WHEN** user hovers over a pet card
- **THEN** the card image scales slightly (1.05x) with a smooth transition (0.3s ease)
- **AND** the card may lift with an increased box-shadow

#### Scenario: Hover effect does not cause layout shift
- **WHEN** the card hover effect is triggered
- **THEN** the effect uses CSS transform (GPU accelerated)
- **AND** no layout shift occurs (no change to width, height, margin, or padding)

### Requirement: Pet cards SHALL use vertical layout
Pet cards SHALL arrange content vertically: image on top (full width), followed by pet details, with action buttons at the bottom.

#### Scenario: Vertical card layout
- **WHEN** a pet card is rendered
- **THEN** the image appears at the top, spanning full card width
- **AND** pet details (name, breed, age) appear below the image
- **AND** action buttons appear at the bottom of the card
