# VietSeeds Run - UI/UX Design System Guidelines

## Core Principles
1. **Premium Aesthetic**: Every component should feel high-end, using deep shadows and subtle gradients.
2. **Dynamic Motion**: Use `framer-motion` for all transitions. Avoid static state changes.
3. **Glassmorphism**: Utilize the "Tempered Glass" effect for floating UI elements.

---

## 1. Glassmorphism (Tempered Glass)
Used for taskbars, floating cards, and modals.

### Utility Class: `.glass-premium`
- **Background**: `rgba(255, 255, 255, 0.75)`
- **Blur**: `24px` (Backdrop)
- **Saturation**: `180%` (Enhances colors behind the glass)
- **Border**: `1px solid rgba(255, 255, 255, 0.4)` (Simulates edge reflection)
- **Box Shadow**: Multi-layered for depth.
  - Outer: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
  - Inner Glow: `inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)`

### When to use:
- On high-contrast or vibrant backgrounds (especially the **VietSeeds Green**).
- To create visual hierarchy without blocking the content underneath completely.

---

## 2. Floating Taskbar Rules
- **Position**: Fixed bottom, centered.
- **Elevation**: Must have `shadow-glass` to stand out from the main content.
- **Interactions**:
  - **Hover**: Scale `1.1`, slight lift (`y: -4`).
  - **Active State**: Use a primary color background with a glowing icon.
  - **Spring Physics**: Use `type: "spring", stiffness: 380, damping: 30` for a snappier feel.

---

## 3. Color Palette
- **Primary**: `hsl(142, 72%, 30%)` (Official VietSeeds Green).
- **Accent**: `hsl(45, 95%, 52%)` (Vibrant Yellow for badges/titles).
- **Secondary**: Glass-white or soft slate for backgrounds.

---

## 4. Typography
- **Headings**: `Space Grotesk`, Heavy weight, Italic/Uppercase for "Hero" feel.
- **Body**: `Inter` for legibility.

---

## 5. Layout Spacing
- Ensure `main` content always has `pb-24` when the Floating Taskbar is active to prevent occlusion of interactive elements at the bottom of pages.

---

## 6. Search Bar (Expanding Glass)
- **Style**: Uses `.glass-premium` for the input field itself when expanded.
- **Animation**:
  - Horizontal expansion from `width: 0` to `width: 300px`.
  - Content fades in (`opacity: 0 -> 1`) during expansion.
- **Icons**: 
  - Search icon on the left (Colored with `--primary`).
  - Clear icon (X) on the right (Muted, interactive).
- **Behavior**: Triggered by a standalone icon button that follows the general button style (white background, subtle border).
