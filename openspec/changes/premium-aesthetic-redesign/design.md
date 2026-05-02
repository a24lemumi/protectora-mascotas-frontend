## Context

The current frontend uses a basic design system with inconsistent styling, emoji-based icons, and a cluttered catalog layout. The application lacks visual hierarchy and professional polish needed for a modern pet adoption platform. The redesign targets the catalog, card components, forms, typography, and iconography.

Current state:
- Catalog displays "Mascotas Destacadas" section with horizontal carousel
- Cards use horizontal layout with generic styling
- Theme toggle uses emoji (☀️/🌙)
- Forms use basic input styling without visual feedback
- Typography relies on system fonts
- Color palette lacks professional consistency

## Goals / Non-Goals

**Goals:**
- Create a premium, professional visual experience
- Implement consistent typography and color systems
- Redesign catalog with clean 3-column grid layout
- Replace emojis with minimalist SVG icons
- Improve form UX with glass morphism and clear feedback
- Enhance card UI with portrait layout and hover effects

**Non-Goals:**
- Changing backend API structures
- Modifying pet data models
- Adding new functionality beyond visual/aesthetic changes
- Implementing authentication logic changes
- Mobile-first redesign (responsive improvements only)

## Decisions

### Typography System
**Decision**: Use Google Fonts with 'Outfit' for headings (500-700 weight) and 'Inter' for body text (400-500 weight).

**Rationale**: Outfit provides a modern, geometric aesthetic for headings while Inter offers excellent readability for body content. Both are variable fonts optimizing load performance.

**Alternatives considered**:
- System fonts only (lacks premium feel)
- Single font family (less visual hierarchy)

### Color Palette
**Decision**: Deep grays (#1a1a2e, #16213e), Pure White (#ffffff), Electric Blue (#0066ff) as accent.

**Rationale**: Deep grays provide professional foundation, pure white ensures content clarity, electric blue creates strong call-to-action visibility while maintaining trust.

**Alternatives considered**:
- Warm grays with orange accent (less professional)
- Dark mode-first approach (premature without user demand)

### Icon System
**Decision**: Inline SVG paths for theme toggle (sun/moon) and action buttons, stored as React components.

**Rationale**: SVG provides crisp rendering at all sizes, allows CSS customization (color, stroke), and avoids external icon library dependencies.

**Alternatives considered**:
- Heroicons/Lucide React (adds dependency)
- Icon font (rendering issues, accessibility concerns)

### Card Layout
**Decision**: 3:4 portrait image ratio with vertical card layout, soft borders (8px radius), subtle shadows, and CSS transform scale on hover.

**Rationale**: Portrait ratio (3:4) showcases pet photos better than landscape. Vertical cards create visual rhythm in grid. Hover zoom creates engaging interaction without complexity.

**Alternatives considered**:
- Square image ratio (less dynamic)
- Card flip animation (too complex, performance concerns)

### Form Styling
**Decision**: Minimal glass morphism with backdrop-filter: blur, semi-transparent backgrounds, clear border color changes for validation states.

**Rationale**: Glass morphism creates modern, premium feel. Visual feedback (red border for errors, green for success) improves usability without clutter.

**Alternatives considered**:
- Flat design with colored backgrounds (less premium)
- Heavy glass with heavy blur (performance impact)

### Catalog Layout
**Decision**: Remove "Mascotas Destacadas" and carousel. Use CSS Grid with 3 columns (desktop), 2 columns (tablet), 1 column (mobile).

**Rationale**: Simplifies user experience, reduces cognitive load. Grid layout provides consistent browsing experience without horizontal scrolling.

**Alternatives considered**:
- Keep carousel but restyle (adds complexity)
- Masonry layout (browser support concerns)

## Risks / Trade-offs

- **Performance**: Google Fonts loading may cause FOUT (Flash of Unstyled Text) → Mitigate with font-display: swap and system font fallbacks
- **Browser Support**: backdrop-filter for glass morphism not supported in older browsers → Provide solid background fallback
- **Image Cropping**: 3:4 ratio may crop existing pet photos → Implement object-fit: cover with intelligent focal point
- **Accessibility**: Color contrast with deep grays → Ensure WCAG 2.1 AA compliance for all text/background combinations
- **CSS Transform**: Hover zoom on cards may cause layout shifts → Use transform (GPU accelerated) instead of width/height changes
