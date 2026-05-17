---
name: Terminal Slate
colors:
  surface: '#14121b'
  surface-dim: '#14121b'
  surface-bright: '#3a3841'
  surface-container-lowest: '#0e0d15'
  surface-container-low: '#1c1b23'
  surface-container: '#201f27'
  surface-container-high: '#2a2932'
  surface-container-highest: '#35343d'
  on-surface: '#e5e0ed'
  on-surface-variant: '#c9c4d7'
  inverse-surface: '#e5e0ed'
  inverse-on-surface: '#312f38'
  outline: '#928ea0'
  outline-variant: '#474554'
  surface-tint: '#c7bfff'
  primary: '#c7bfff'
  on-primary: '#2c009e'
  primary-container: '#4226bb'
  on-primary-container: '#b4aaff'
  inverse-primary: '#5b45d4'
  secondary: '#c7bfff'
  on-secondary: '#2f2860'
  secondary-container: '#463f78'
  on-secondary-container: '#b6adee'
  tertiary: '#90cdff'
  on-tertiary: '#003350'
  tertiary-container: '#004a70'
  on-tertiary-container: '#76bbf0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c7bfff'
  on-primary-fixed: '#180064'
  on-primary-fixed-variant: '#4327bc'
  secondary-fixed: '#e5deff'
  secondary-fixed-dim: '#c7bfff'
  on-secondary-fixed: '#1a114a'
  on-secondary-fixed-variant: '#463f78'
  tertiary-fixed: '#cbe6ff'
  tertiary-fixed-dim: '#90cdff'
  on-tertiary-fixed: '#001e31'
  on-tertiary-fixed-variant: '#004b72'
  background: '#14121b'
  on-background: '#e5e0ed'
  surface-variant: '#35343d'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-margin: 32px
  gutter-base: 24px
  section-gap: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for high-performance developer environments. It prioritizes clarity, technical precision, and reduced cognitive load through a **Minimalist-Modern** aesthetic with a **Dark Theme** first approach.

The brand personality is authoritative yet approachable—mimicking the efficiency of a high-end IDE while maintaining the accessibility of a modern SaaS platform. The visual language utilizes a "Deep Slate" foundation to provide a low-strain environment for long-form reading of technical questions and code snippets, punctuated by "Deep Indigo" interactive elements and "Oceanic Cyan" highlights to signal progression and action. 

Key visual principles:
- **Functional Density:** Information is packed logically but balanced with generous whitespace to prevent overwhelm.
- **Systematic Order:** Heavy reliance on grid alignment and consistent horizontal rhythm.
- **Technical Sophistication:** Subtle use of monospaced-adjacent grotesque fonts and hairline borders to evoke a sense of "built by developers for developers."

## Colors

The palette is built on a scale of deep slates and cool grays to create a sophisticated, low-contrast background that allows vibrant indigo and cyan accents to pop.

- **Primary (Deep Indigo):** Used exclusively for primary actions, progress indicators, and active states. It represents momentum and growth.
- **Secondary/Tertiary (Oceanic Cyan):** These form specialized interactive zones and secondary callouts. Tertiary cyan is specifically used for technical accents and differentiated metrics.
- **Neutral (Slate/Steel Gray):** Reserved for secondary text, borders, and inactive icons to maintain a clear hierarchy.
- **Success (Emerald):** Specifically for completed "Skill Gaps" or correctly answered technical questions.

The color system relies on layering surface tiers with varying tonal values rather than introducing too many unique hues, keeping the interface cohesive.

## Typography

The typography system uses **Hanken Grotesk** for its sharp, contemporary geometry and exceptional legibility in dark environments. For technical metadata and "Skill Gap" tags, **JetBrains Mono** is introduced to provide a clear functional distinction between prose and technical data.

- **Headlines:** Use tighter letter spacing and semi-bold weights to create a strong anchor for each dashboard section.
- **Body:** Standardized at 16px with a generous 1.5x line height to ensure technical questions are easy to scan.
- **Labels:** Always in JetBrains Mono and often uppercase when used in small UI components (like chips or sidebar headers) to reinforce the "developer tool" aesthetic.

## Layout & Spacing

This design system utilizes a **Fixed 12-Column Grid** for desktop to ensure the multi-pane dashboard remains stable and predictable. 

- **Desktop (1440px+):** A 3-pane layout as seen in the wireframe. 
    - Left Pane (Navigation/Categories): 250px fixed.
    - Center Pane (Main Content): Fluid.
    - Right Pane (Skill Gaps/Metrics): 320px fixed.
- **Tablet (768px - 1024px):** The right pane collapses into a drawer or moves below the main content.
- **Mobile (<768px):** A single-column fluid layout with 16px margins.

The spacing rhythm is based on an **8px linear scale**. Use "Stack" spacing for vertical relationships within cards and "Section Gap" for the distance between major dashboard modules.

## Elevation & Depth

In this dark-themed developer dashboard, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows. This keeps the UI feeling flat and "pro-grade."

1. **Floor (Level 0):** The deepest layer, used for the global background.
2. **Surface (Level 1):** Used for the sidebars and the main content area.
3. **Container (Level 2):** Used for cards, widgets, and skill gap chips.
4. **Bordering:** Elements are separated by 1px borders. This provides "technical" definition without the fuzziness of shadows.

Interaction is signaled by a subtle border transition or glow in the primary Indigo on focus or active states.

## Shapes

The design uses a **Soft (Level 1)** shape language. The subtle rounding (4px - 12px) balances the rigid, technical nature of the grid with a modern, accessible feel.

- **Standard Elements:** 4px radius (Checkboxes, Input fields, small chips).
- **Cards & Panes:** 8px radius (Main dashboard widgets).
- **Large Containers:** 12px radius (Main dashboard outer wrapper, if applicable).

This creates a "precision-milled" look that feels intentional and clean.

## Components

### Buttons & Chips
- **Primary Button:** Solid Indigo background, White text, Hanken Grotesk SemiBold.
- **Skill Chips:** Level 2 surface with a subtle border. Use JetBrains Mono for the text.
- **Ghost Actions:** Transparent background with a Slate border; becomes Indigo or Cyan on hover.

### Cards (Technical Questions/Skill Gaps)
- Cards use a Level 2 surface. 
- Headers within cards should use `title-md`. 
- Footers of cards (containing tags or metadata) are separated by a 1px hairline border.

### Input Fields
- Dark backgrounds with a 1px border. 
- On focus, the border transitions to Primary Indigo with a subtle outer glow.

### Sidebar Navigation
- Active items are indicated by a vertical 4px Primary Indigo bar on the left edge and a subtle background tint.
- Category labels (e.g., "Technical questions") should be `label-sm` and uppercase.

### Skill Gap Widgets
- Use a "Progress Ring" or "Linear Bar" using the Primary Indigo or Tertiary Cyan for the fill and Level 0 Slate for the track.