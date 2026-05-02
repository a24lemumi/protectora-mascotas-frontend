## Why

The current frontend lacks visual sophistication and professional polish. Users experience an inconsistent design language with generic emojis, basic typography, and a cluttered catalog layout. A premium aesthetic transformation will elevate brand perception, improve user engagement, and create a modern, trustworthy platform for pet adoption.

## What Changes

- **Remove** the "Mascotas Destacadas" section and horizontal carousel from the catalog
- **Redesign** the catalog as a 3-column (desktop) grid with elegant vertical cards
- **Replace** emoji and generic icons with minimalist SVG paths for theme toggle (sun/moon) and action buttons
- **Implement** typography system using 'Outfit' for headings and 'Inter' for body text
- **Apply** professional color palette: deep grays, pure white, and electric blue as accent
- **Redesign** pet cards with 3:4 portrait image ratio, soft borders, subtle shadows, and refined hover effects with slight image zoom
- **Simplify** Login and Register forms with 'minimal glass' style and clear visual feedback for errors/success

## Capabilities

### New Capabilities
- `premium-catalog-layout`: Redesigned catalog with 3-column grid, removed featured section/carousel, and vertical card layout
- `svg-icon-system`: Professional SVG icon set for theme toggle (sun/moon) and action buttons, replacing emojis/generic icons
- `typography-color-system`: Typography hierarchy with Outfit (headings) and Inter (body), plus professional color palette (deep grays, white, electric blue)
- `card-ui-redesign`: Pet card UI with 3:4 image ratio, soft borders, subtle shadows, and refined hover zoom effects
- `form-ux-improvement`: Login/Register forms with minimal glass aesthetic and clear visual error/success feedback

### Modified Capabilities

## Impact

- **Components**: Catalog, Card, ThemeToggle, LoginForm, RegisterForm, Button, Input components
- **Styles**: Global CSS variables, typography system, color palette, component-specific styles
- **Dependencies**: Add Google Fonts (Outfit, Inter), potentially SVG icon library
- **Assets**: New SVG icons for theme toggle and actions, updated card image handling
- **User Experience**: Modernized visual language, improved form usability, streamlined catalog browsing
