## 1. Typography and Color System Setup

- [ ] 1.1 Add Google Fonts (Outfit and Inter) to the project with font-display: swap
- [ ] 1.2 Define CSS custom properties for the professional color palette (deep grays, white, electric blue)
- [ ] 1.3 Update global typography styles to use Outfit for headings and Inter for body text
- [ ] 1.4 Verify WCAG 2.1 AA color contrast compliance for all text/background combinations

## 2. SVG Icon System

- [ ] 2.1 Create SVG icon components for sun and moon (theme toggle)
- [ ] 2.2 Create SVG icon components for action buttons (favorite, edit, delete, etc.)
- [ ] 2.3 Implement reusable React icon component with size and color props
- [ ] 2.4 Replace emoji/icon font usage in ThemeToggle component with SVG icons
- [ ] 2.5 Replace emoji/icon font usage in action buttons with SVG icons

## 3. Card UI Redesign

- [ ] 3.1 Update pet card component to use 3:4 portrait image ratio with object-fit: cover
- [ ] 3.2 Implement vertical card layout (image top, details middle, actions bottom)
- [ ] 3.3 Add soft borders (8px radius) and subtle box-shadow to cards
- [ ] 3.4 Implement hover effect with image scale transform (1.05x) and smooth transition
- [ ] 3.5 Ensure hover effect uses GPU-accelerated transform without layout shifts

## 4. Catalog Layout Redesign

- [ ] 4.1 Remove "Mascotas Destacadas" section from catalog page
- [ ] 4.2 Remove horizontal carousel component from catalog
- [ ] 4.3 Implement CSS Grid layout for catalog (3 columns desktop, 2 tablet, 1 mobile)
- [ ] 4.4 Update catalog to use redesigned vertical cards
- [ ] 4.5 Add responsive breakpoints and test grid layout across viewport sizes

## 5. Form UX Improvement

- [ ] 5.1 Implement minimal glass morphism style for Login form (backdrop-filter, semi-transparent background)
- [ ] 5.2 Implement minimal glass morphism style for Register form
- [ ] 5.3 Add solid background fallback for browsers without backdrop-filter support
- [ ] 5.4 Implement error state styling (red border #ef4444, error message) for form inputs
- [ ] 5.5 Implement success state styling (green border #22c55e, success indicator) for form inputs
- [ ] 5.6 Style primary action buttons with electric blue (#0066ff) background and white text
- [ ] 5.7 Verify form accessibility (labels, error announcements, keyboard navigation)

## 6. Integration and Testing

- [ ] 6.1 Test complete user flow: browse catalog, view pet details, login/register
- [ ] 6.2 Verify hover effects and transitions perform smoothly (no jank)
- [ ] 6.3 Test responsive layout across desktop, tablet, and mobile viewports
- [ ] 6.4 Validate theme toggle works with new SVG icons in both light and dark modes
- [ ] 6.5 Check form validation feedback displays correctly for all error/success states
