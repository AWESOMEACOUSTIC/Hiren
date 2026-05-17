---
name: Muted Noir
colors:
  surface: '#171213'
  surface-dim: '#171213'
  surface-bright: '#3e3839'
  surface-container-lowest: '#110d0e'
  surface-container-low: '#1f1a1b'
  surface-container: '#231e1f'
  surface-container-high: '#2e292a'
  surface-container-highest: '#393334'
  on-surface: '#ebe0e1'
  on-surface-variant: '#d4c2c5'
  inverse-surface: '#ebe0e1'
  inverse-on-surface: '#352f30'
  outline: '#9d8d90'
  outline-variant: '#504446'
  surface-tint: '#f2b7c6'
  primary: '#f2b7c6'
  on-primary: '#4b2431'
  primary-container: '#20030d'
  on-primary-container: '#9f6d7b'
  inverse-primary: '#80515e'
  secondary: '#ddbfc5'
  on-secondary: '#3e2b30'
  secondary-container: '#594348'
  on-secondary-container: '#ceb1b7'
  tertiary: '#b8c7e1'
  on-tertiary: '#233145'
  tertiary-container: '#000d20'
  on-tertiary-container: '#6d7b93'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e2'
  primary-fixed-dim: '#f2b7c6'
  on-primary-fixed: '#32101c'
  on-primary-fixed-variant: '#653a47'
  secondary-fixed: '#fadbe0'
  secondary-fixed-dim: '#ddbfc5'
  on-secondary-fixed: '#28171b'
  on-secondary-fixed-variant: '#564146'
  tertiary-fixed: '#d4e3fe'
  tertiary-fixed-dim: '#b8c7e1'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#39485d'
  background: '#171213'
  on-background: '#ebe0e1'
  surface-variant: '#393334'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 32px
  gutter: 24px
  stack-sm: 12px
  stack-md: 24px
---

## Brand & Style

The design system is crafted for sophisticated professional environments that value atmospheric depth, focus, and understated authority. Moving away from high-energy vibrance, the brand personality is now grounded, moody, and refined. It utilizes a dark-mode-first approach that prioritizes long-form concentration and a "hushed" aesthetic.

The visual style is a blend of **Modern Corporate** and **Atmospheric Minimalism**, characterized by deep midnight foundations, muted rose-taupe accents, and a subtle interplay of warm and cool dark tones. It evokes a sense of quiet intelligence and steady reliability, making the user feel calm and in control.

## Colors

The color palette is rooted in a complex, dark-spectrum foundation to provide a sophisticated backdrop for professional workflows.

*   **Primary (Dusty Rose):** A muted, desaturated rose-taupe (#9B6977) used for primary actions and brand presence. It offers a sophisticated, low-fatigue alternative to traditional bright accents.
*   **Secondary (Warm Grey):** Used for supporting elements and secondary actions, bridging the gap between the dark background and the primary accent.
*   **Tertiary (Midnight Blue):** A deep, near-black blue (#000D20) used for subtle contrast in containers and backgrounds to add depth to the dark mode.
*   **Neutral (Slate Grey):** The foundation of the UI. Backgrounds use the darkest values, while containers use slightly warmer tones to create hierarchy.

## Typography

The typography system uses **Geist** to maintain a technical, developer-centric aesthetic. It prioritizes legibility in low-light environments by leveraging precise weights and generous spacing.

*   **Headlines:** Utilize bold weights and tight letter-spacing for a modern, impactful look that remains professional.
*   **Body:** Optimized for readability with generous line heights to prevent text from feeling cramped within deep, dark containers.
*   **Labels:** Small-caps or medium weights are used for metadata and utility labels to create clear separation from body content.

## Layout & Spacing

This design system employs a **Fluid Grid** model within a maximum content width of 1280px. The layout is structured around an 8px base unit.

*   **Card-Based Structure:** Content is organized into distinct functional cards to maintain order in complex views.
*   **Desktop:** A 12-column grid with 24px gutters. Key modules typically span 6 columns for side-by-side comparison.
*   **Tablet/Mobile:** Content reflows into a single-column stack. Margins reduce from 32px (Desktop) to 16px (Mobile).
*   **Rhythm:** Vertical spacing between sections (Stack-md) is double the spacing between elements within a section (Stack-sm).

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** to preserve the atmospheric, muted aesthetic.

*   **Surface 0:** Main background, utilizing the deepest Tertiary values.
*   **Surface 1:** Primary cards and containers, slightly elevated through lighter tonal variations.
*   **Surface 2:** Input fields and recessed areas, providing tactile depth without relying on heavy shadows.
*   **Borders:** Subtle 1px borders define boundaries, using the Neutral or Secondary tones at low opacities.

## Shapes

The shape language is balanced—friendly enough to be modern but sharp enough to feel professional and structured.

*   **Cards:** 1rem (16px) corner radius for main layout containers.
*   **Components:** Buttons and input fields use a 0.5rem (8px) radius.
*   **Interactive Elements:** Icons within buttons or chips are paired with standard roundedness to maintain a cohesive silhouette.

## Components

### Buttons
*   **Primary:** Solid Dusty Rose background with high-contrast text. The style is matte and professional, avoiding loud glows.
*   **Secondary:** Ghost style with a 1px border using the Secondary warm-grey tone.

### Cards
*   Defined by a subtle tonal shift from the background and a 1px soft border.
*   Header areas use a subtle divider to separate metadata from the main content body.

### Input Fields
*   **Text Areas:** Deep, recessed background with a 1px border that warms on focus to the Primary color.
*   **Placeholders:** Low-contrast grey text to maintain focus on user-entered data.

### Chips & Badges
*   Used for status. These use semi-transparent versions of semantic colors (Red/Green) but are desaturated to match the overall muted palette of the system.