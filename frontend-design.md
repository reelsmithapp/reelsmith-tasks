# ReelSmith Frontend Design System

## Brand Overview

**Name**: ReelSmith  
**Tagline**: "Forge Your Vision"  
**Secondary Tagline**: "Where Ideas Become Productions"

**Brand Essence**: ReelSmith is built on the concept of **"Molten Logic"** — the transition from liquid to solid. Raw AI imagination (fluid, organic, chaotic) crystallizes into structured video productions (solid, precise, forged). It's a laboratory built inside a nebula.

---

## Brand Personality

| Trait           | Expression                                              |
| --------------- | ------------------------------------------------------- |
| **Powerful**    | Professional-grade tools that command respect           |
| **Cinematic**   | Every interaction feels like a movie moment             |
| **Dual-Nature** | Chaotic creativity contained within precise structure   |
| **Warm**        | The warmth of a forge, thermal gradients, living energy |
| **Progressive** | Cutting-edge tech with craftsmanship at its core        |

**Brand Voice**:

- Bold and confident, never timid
- Clear and direct, never jargon-heavy
- Craftsman-like ("Forge", "Shape", "Crystallize", "Melt")
- Cinematic language ("Scene", "Cut", "Frame", "Render")

---

## Core Concept: "Molten Logic"

The design system operates on a **dual-mode philosophy**:

### The AI (Fluid Layer)

- Represents raw imagination, neural networks, possibilities
- Hyper-saturated, liquid, organic
- Used in: Marketing pages, loading states, generation moments

### The Tool (Solid Layer)

- Represents the "Smith" aspect — structure, nodes, timelines
- Glass, metal, deep void
- Used in: Dashboard, editors, workspace

---

## Color System

### Primary Palette — "The Thermal Gradient"

The brand signature is a **thermal gradient** paying homage to "Smith" (heat/forging).

```css
:root {
  /* === THE SHOUT GRADIENT (Brand Soul) === */
  --color-inferno-orange: #ffad00; /* The energy source - primary */
  --color-plasma-violet: #8f00ff; /* The AI magic - secondary */

  /* Extended Inferno Scale */
  --color-inferno-50: #fff9e6;
  --color-inferno-100: #ffefb3;
  --color-inferno-200: #ffe580;
  --color-inferno-300: #ffdb4d;
  --color-inferno-400: #ffd11a;
  --color-inferno-500: #ffad00; /* Primary brand orange */
  --color-inferno-600: #e69900;
  --color-inferno-700: #b37700;
  --color-inferno-800: #805500;
  --color-inferno-900: #4d3300;

  /* Extended Plasma Scale */
  --color-plasma-50: #f5e6ff;
  --color-plasma-100: #e0b3ff;
  --color-plasma-200: #cc80ff;
  --color-plasma-300: #b84dff;
  --color-plasma-400: #a31aff;
  --color-plasma-500: #8f00ff; /* Primary brand violet */
  --color-plasma-600: #7300cc;
  --color-plasma-700: #5c00a3;
  --color-plasma-800: #460080;
  --color-plasma-900: #30005c;

  /* === THE VOID (Backgrounds) === */
  --color-obsidian: #050508; /* Deep cold charcoal - not pure black */
  --color-obsidian-elevated: #0a0a0f; /* Slightly elevated surfaces */
  --color-obsidian-surface: #0f0f15; /* Cards, panels */
  --color-obsidian-hover: #15151d; /* Hover states */

  /* === THE GLASS (UI Surfaces) === */
  --color-frost-white: #ffffff;
  --glass-frost-5: rgba(255, 255, 255, 0.05); /* Subtle panels */
  --glass-frost-10: rgba(255, 255, 255, 0.1); /* Standard panels */
  --glass-frost-15: rgba(255, 255, 255, 0.15); /* Elevated panels */
  --glass-frost-20: rgba(255, 255, 255, 0.2); /* Hover states */

  /* Glass accent glow */
  --glass-orange-glow: rgba(255, 173, 0, 0.15);
  --glass-violet-glow: rgba(143, 0, 255, 0.15);

  /* === TEXT === */
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-text-tertiary: rgba(255, 255, 255, 0.5);
  --color-text-muted: rgba(255, 255, 255, 0.3);

  /* === SEMANTIC === */
  --color-success: #00ff88;
  --color-success-muted: rgba(0, 255, 136, 0.2);
  --color-warning: #ffad00;
  --color-warning-muted: rgba(255, 173, 0, 0.2);
  --color-error: #ff4d4d;
  --color-error-muted: rgba(255, 77, 77, 0.2);
  --color-info: #00c4cc;
  --color-info-muted: rgba(0, 196, 204, 0.2);

  /* === REFERENCE TYPE BADGES === */
  --badge-character: #8f00ff; /* Plasma Violet */
  --badge-product: #ffad00; /* Inferno Orange */
  --badge-setting: #00c4cc; /* Teal */
  --badge-style: #ff00aa; /* Pink */
  --badge-before: #ff4d00; /* Red-Orange */
  --badge-after: #00ff88; /* Green */
  --badge-logo: #ffffff; /* White */
  --badge-core: #ffd700; /* Gold */
}
```

### Gradients

```css
:root {
  /* Primary Brand Gradient - The Thermal Gradient */
  --gradient-brand: linear-gradient(135deg, #ffad00 0%, #8f00ff 100%);
  --gradient-brand-reverse: linear-gradient(135deg, #8f00ff 0%, #ffad00 100%);

  /* Horizontal variant for progress bars */
  --gradient-brand-horizontal: linear-gradient(90deg, #ffad00 0%, #8f00ff 100%);

  /* Ambient glow gradients */
  --gradient-glow-orange: radial-gradient(
    ellipse at center,
    rgba(255, 173, 0, 0.3) 0%,
    transparent 70%
  );
  --gradient-glow-violet: radial-gradient(
    ellipse at center,
    rgba(143, 0, 255, 0.3) 0%,
    transparent 70%
  );

  /* Background void gradient - subtle depth */
  --gradient-void: radial-gradient(
    ellipse at top center,
    #0f0f15 0%,
    #050508 70%
  );

  /* Glass edge glow (for active states) */
  --gradient-glass-edge: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 173, 0, 0.5) 25%,
    rgba(143, 0, 255, 0.5) 75%,
    transparent 100%
  );

  /* Marketing fluid blobs */
  --gradient-fluid-blob: conic-gradient(
    from 180deg at 50% 50%,
    #ffad00 0deg,
    #ff4d00 90deg,
    #8f00ff 180deg,
    #00c4cc 270deg,
    #ffad00 360deg
  );
}
```

### Color Usage Guidelines

| Element              | Color / Style                   | Notes                      |
| -------------------- | ------------------------------- | -------------------------- |
| Page background      | `--color-obsidian`              | The deep void              |
| Cards/Panels         | `--glass-frost-10` + blur       | Glassmorphic surfaces      |
| Primary buttons      | `--gradient-brand`              | Full thermal gradient      |
| Primary button hover | Intensified glow + scale        | Living energy feel         |
| Secondary buttons    | `--glass-frost-10` + border     | Subtle glass               |
| Active/Selected      | `--glass-orange-glow` or violet | Ambient light bleed        |
| Text links           | `--color-inferno-500`           | Warm, inviting             |
| Success states       | `--color-success`               | Generation complete        |
| Error states         | `--color-error`                 | Failed generation          |
| Progress/Loading     | `--gradient-brand-horizontal`   | Animated thermal fill      |
| Borders              | `--glass-frost-5`               | Nearly invisible structure |
| Node connections     | `--gradient-brand` animated     | Data stream pulses         |

---

## Typography

### Font Stack

**Headings (Marketing)**: **Monument Extended**

- Massive, structural, slightly aggressive
- Used in: Marketing headlines, hero sections, empty states
- Style: Uppercase for maximum impact
- Weights: Regular (400), Bold (700)

**Body & UI (App)**: **Satoshi**

- Clean, variable sans-serif
- Excellent readability on dark backgrounds
- Used for: All UI text, body copy, buttons, labels
- Weights: Regular (400), Medium (500), Bold (700)

**Node Canvas / Code**: **JetBrains Mono**

- Technical, power-user aesthetic
- Used for: Node labels, parameter inputs, timestamps, IDs
- Weights: Regular (400), Medium (500)

### Font Loading

```html
<!-- Satoshi from Fontshare -->
<link
  href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
  rel="stylesheet"
/>

<!-- Monument Extended (self-hosted or licensed) -->
<!-- Note: Monument Extended requires a license from Pangram Pangram Foundry -->
<!-- Self-host the font files in /public/fonts/ -->
<style>
  @font-face {
    font-family: "Monument Extended";
    src: url("/fonts/MonumentExtended-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Monument Extended";
    src: url("/fonts/MonumentExtended-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
</style>

<!-- JetBrains Mono from Google Fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### Type Scale

```css
:root {
  /* Font families */
  --font-display: "Monument Extended", system-ui, sans-serif;
  --font-sans: "Satoshi", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Type scale */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
  --text-6xl: 3.75rem; /* 60px */
  --text-7xl: 4.5rem; /* 72px */
  --text-8xl: 6rem; /* 96px - Marketing heroes */

  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.1em; /* For uppercase marketing text */
}
```

### Typography Usage

| Element              | Font              | Size    | Weight | Style                    |
| -------------------- | ----------------- | ------- | ------ | ------------------------ |
| Marketing hero       | Monument Extended | 72-96px | 700    | Uppercase, tight spacing |
| Marketing subhead    | Monument Extended | 36-48px | 400    | Uppercase                |
| Page title           | Satoshi           | 30px    | 700    | Normal case              |
| Section heading      | Satoshi           | 20-24px | 700    | Normal case              |
| Card title           | Satoshi           | 16px    | 600    | Normal case              |
| Body text            | Satoshi           | 14-16px | 400    | Normal case              |
| Small/Caption        | Satoshi           | 12px    | 400    | Normal case              |
| Button               | Satoshi           | 14px    | 600    | Normal case              |
| Input                | Satoshi           | 14px    | 400    | Normal case              |
| Node labels          | JetBrains Mono    | 12px    | 500    | Normal case              |
| Code/Technical       | JetBrains Mono    | 13px    | 400    | Normal case              |
| Empty state headline | Monument Extended | 24-30px | 400    | Uppercase                |

---

## Glassmorphism System

The UI uses **frosted glass panels** as a core design element.

### Glass Panel Styles

```css
/* Standard glass panel */
.glass-panel {
  background: var(--glass-frost-10);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--glass-frost-5);
  border-radius: var(--radius-xl);
}

/* Elevated glass panel (modals, dropdowns) */
.glass-panel-elevated {
  background: var(--glass-frost-15);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid var(--glass-frost-10);
  border-radius: var(--radius-xl);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px var(--glass-frost-5);
}

/* Glass panel with active glow */
.glass-panel-active {
  background: var(--glass-frost-10);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 173, 0, 0.3);
  box-shadow:
    0 0 30px var(--glass-orange-glow),
    inset 0 0 30px var(--glass-orange-glow);
}

/* Glass panel hover state */
.glass-panel:hover {
  background: var(--glass-frost-15);
  border-color: var(--glass-frost-10);
  box-shadow: 0 0 40px var(--glass-violet-glow);
}
```

### Blur Strengths

| Context           | Blur Amount | Background Alpha |
| ----------------- | ----------- | ---------------- |
| Subtle panels     | 20px        | 5%               |
| Standard panels   | 30px        | 10%              |
| Elevated (modals) | 40px        | 15%              |
| Heavy overlay     | 50px        | 20%              |

---

## Spacing & Layout

### Spacing Scale

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  --space-32: 8rem; /* 128px */
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.375rem; /* 6px - small elements, badges */
  --radius-md: 0.5rem; /* 8px - buttons, inputs */
  --radius-lg: 0.75rem; /* 12px - small cards */
  --radius-xl: 1rem; /* 16px - cards, panels */
  --radius-2xl: 1.5rem; /* 24px - large cards, modals */
  --radius-3xl: 2rem; /* 32px - hero elements */
  --radius-full: 9999px; /* Pills, avatars */
}
```

---

## Component Patterns

### Primary Button (Gradient)

```css
.btn-primary {
  background: var(--gradient-brand);
  color: var(--color-obsidian);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gradient-brand);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(255, 173, 0, 0.3);
}

.btn-primary:hover::before {
  opacity: 0.5;
}
```

### Secondary Button (Glass)

```css
.btn-secondary {
  background: var(--glass-frost-10);
  backdrop-filter: blur(20px);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-frost-10);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--glass-frost-15);
  border-color: var(--glass-frost-20);
}
```

### Input Field (Glowing Prism)

```css
.input-field {
  background: var(--glass-frost-5);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-frost-10);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-inferno-500);
  box-shadow:
    0 0 0 3px rgba(255, 173, 0, 0.1),
    0 0 20px rgba(255, 173, 0, 0.2);
}

/* Hero prompt input - the glowing prism */
.input-hero {
  background: var(--glass-frost-10);
  backdrop-filter: blur(30px);
  border: 2px solid var(--glass-frost-15);
  border-radius: var(--radius-xl);
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-lg);
  transition: all 0.3s ease;
}

.input-hero:focus {
  border-image: var(--gradient-brand) 1;
  box-shadow:
    0 0 40px var(--glass-orange-glow),
    0 0 80px var(--glass-violet-glow);
}
```

### Card (Glass Panel)

```css
.card {
  background: var(--glass-frost-10);
  backdrop-filter: blur(30px);
  border: 1px solid var(--glass-frost-5);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all 0.3s ease;
}

.card:hover {
  background: var(--glass-frost-15);
  border-color: var(--glass-frost-10);
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px var(--glass-violet-glow);
}

/* Active card - selected state */
.card-active {
  border-color: var(--color-inferno-500);
  box-shadow:
    0 0 30px var(--glass-orange-glow),
    inset 0 1px 0 rgba(255, 173, 0, 0.2);
}
```

### Badge (Reference Types)

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-character {
  background: rgba(143, 0, 255, 0.2);
  color: #b84dff;
}
.badge-product {
  background: rgba(255, 173, 0, 0.2);
  color: #ffad00;
}
.badge-setting {
  background: rgba(0, 196, 204, 0.2);
  color: #00c4cc;
}
.badge-style {
  background: rgba(255, 0, 170, 0.2);
  color: #ff00aa;
}
.badge-before {
  background: rgba(255, 77, 0, 0.2);
  color: #ff4d00;
}
.badge-after {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
}
.badge-logo {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
.badge-core {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}
```

---

## Animation & Motion

Since ReelSmith is a video tool, the UI must feel **cinematic**.

### Core Animation Principles

1. **Liquid Physics for Loading** — Never use spinning circles. Use fluid fills.
2. **Crystallization for Generation** — Content "crystallizes" from blur to sharp.
3. **Morph Transitions** — Views transform rather than cut.
4. **Ambient Glow for Activity** — Active elements emit light.

### Animation Tokens

```css
:root {
  /* Durations */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  --duration-cinematic: 1000ms;

  /* Easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Keyframe Animations

```css
/* Fluid fill - for progress bars */
@keyframes fluid-fill {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.progress-fluid {
  background: linear-gradient(
    90deg,
    var(--color-inferno-500) 0%,
    var(--color-plasma-500) 50%,
    var(--color-inferno-500) 100%
  );
  background-size: 200% 100%;
  animation: fluid-fill 2s linear infinite;
}

/* Crystallize - content appearing */
@keyframes crystallize {
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}

.crystallize-in {
  animation: crystallize var(--duration-slow) var(--ease-out) forwards;
}

/* Ambient pulse - for active elements */
@keyframes ambient-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px var(--glass-orange-glow);
  }
  50% {
    box-shadow:
      0 0 40px var(--glass-orange-glow),
      0 0 60px var(--glass-violet-glow);
  }
}

.ambient-glow {
  animation: ambient-pulse 3s ease-in-out infinite;
}

/* Data stream - for node connections */
@keyframes data-stream {
  0% {
    stroke-dashoffset: 100%;
  }
  100% {
    stroke-dashoffset: 0%;
  }
}

.node-connection {
  stroke: url(#gradient-brand);
  stroke-dasharray: 10 5;
  animation: data-stream 1s linear infinite;
}

/* Melt away - for removing elements */
@keyframes melt-away {
  0% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(20px);
  }
}

.melt-out {
  animation: melt-away var(--duration-normal) var(--ease-out) forwards;
}
```

### Interaction Patterns

| Interaction     | Animation                                                 |
| --------------- | --------------------------------------------------------- |
| Button hover    | Scale up + glow intensifies + shadow deepens              |
| Card hover      | Lift (translateY) + backdrop blur intensifies + edge glow |
| Panel open      | Slide in + crystallize (blur to sharp)                    |
| Panel close     | Melt away (blur out + fade)                               |
| Loading         | Fluid fill animation (thermal gradient flowing)           |
| Content appear  | Staggered crystallize (one by one)                        |
| View switch     | Morph transition (elements float to new positions)        |
| Active state    | Ambient pulse glow                                        |
| Node connection | Data stream animation (light pulse traveling)             |

---

## Dual-Mode Design System

### A. Marketing Mode ("The Showroom")

**Visual Physics:** Liquid dynamics. Chaotic, hyper-saturated, selling the dream.

```css
/* Marketing section dividers - fluid waves */
.section-divider-fluid {
  height: 200px;
  background: var(--gradient-fluid-blob);
  filter: blur(60px);
  opacity: 0.6;
  animation: blob-morph 20s ease-in-out infinite;
}

/* Marketing hero glass pane */
.hero-glass {
  background: var(--glass-frost-15);
  backdrop-filter: blur(40px);
  border: 1px solid var(--glass-frost-10);
  border-radius: var(--radius-3xl);
  transform: perspective(1000px) rotateX(5deg);
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 0.5),
    0 0 100px var(--glass-orange-glow);
}

/* Marketing typography - grid-breaking */
.headline-marketing {
  font-family: var(--font-display);
  font-size: var(--text-8xl);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  line-height: var(--leading-none);
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### B. Dashboard Mode ("The Cockpit")

**Visual Physics:** Solid state. The fluid waves freeze into structure.

```css
/* Dashboard base */
.dashboard {
  background: var(--color-obsidian);
  min-height: 100vh;
}

/* Subtle ambient glow from active panel edge */
.dashboard-ambient-glow {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--glass-violet-glow), transparent);
  pointer-events: none;
  opacity: 0.5;
}

/* Dashboard panels - restrained glass */
.dashboard-panel {
  background: var(--glass-frost-5);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-frost-5);
  border-radius: var(--radius-xl);
}
```

---

## Node Canvas Styling

The node editor follows the "Power User Mode" aesthetic.

```css
/* Node canvas grid */
.node-canvas {
  background-color: var(--color-obsidian);
  background-image: radial-gradient(
    circle at 1px 1px,
    var(--glass-frost-10) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}

/* Node card */
.node {
  background: var(--glass-frost-10);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-frost-10);
  border-radius: var(--radius-lg);
  min-width: 200px;
  overflow: hidden;
}

/* Node header - type indicator */
.node-header {
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.node-header-input {
  background: linear-gradient(90deg, var(--color-inferno-500), transparent);
}
.node-header-process {
  background: linear-gradient(90deg, var(--color-plasma-500), transparent);
}
.node-header-output {
  background: linear-gradient(90deg, var(--color-frost-white), transparent);
  color: var(--color-obsidian);
}

/* Node body */
.node-body {
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

/* Node connector */
.node-connector {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: var(--glass-frost-20);
  border: 2px solid var(--color-text-tertiary);
  transition: all 0.2s ease;
}

.node-connector:hover {
  background: var(--color-inferno-500);
  border-color: var(--color-inferno-500);
  box-shadow: 0 0 10px var(--color-inferno-500);
}

/* Node connection wire - animated data stream */
.node-wire {
  stroke-width: 2;
  fill: none;
  filter: drop-shadow(0 0 4px var(--color-plasma-500));
}

/* Minimap */
.node-minimap {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 180px;
  height: 120px;
  background: var(--glass-frost-10);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-frost-10);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
```

---

## Logo & Branding

### The "Flux Hex" Logo

A geometric hexagon (Node/Structure) melting/dripping at one corner (Fluidity/AI).

```css
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.logo-mark {
  width: 40px;
  height: 40px;
  /* The flux hex SVG with gradient fill */
}

.logo-wordmark {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* Animated logo - for loading states */
.logo-mark-animated {
  animation: logo-melt 3s ease-in-out infinite;
}

@keyframes logo-melt {
  0%,
  100% {
    filter: drop-shadow(0 0 10px var(--color-inferno-500));
  }
  50% {
    filter: drop-shadow(0 0 20px var(--color-plasma-500));
  }
}
```

### Logo Variations

| Variant            | Usage                             |
| ------------------ | --------------------------------- |
| Full color on dark | Primary, navigation, marketing    |
| Gradient wordmark  | Marketing heroes                  |
| Monochrome white   | Loading screens, footers          |
| Icon only          | Favicon, app icon, compact spaces |
| Animated (melt)    | Loading, generation states        |

---

## Custom Icons

ReelSmith uses custom iconography matching the brand aesthetic.

| Icon     | Usage                      | Style                   |
| -------- | -------------------------- | ----------------------- |
| Node     | Node editor, canvas toggle | Hexagonal with dot      |
| Timeline | Timeline view, sequencing  | Connected nodes         |
| AI Magic | Generation, AI actions     | Sparkle/star burst      |
| Scene    | Scene cards, scene list    | Film frame              |
| Project  | Project cards, navigation  | Folder with play button |
| Forge    | Primary actions            | Anvil/hammer motif      |

Icon style: 24x24 base, 1.5px stroke, rounded caps, gradient stroke option for emphasis.

---

## Responsive Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Responsive Behaviors

| Breakpoint         | Behavior                                     |
| ------------------ | -------------------------------------------- |
| < 640px (mobile)   | Single column, bottom nav, simplified panels |
| 640-768px (tablet) | Two column grid, collapsible sidebar         |
| 768-1024px         | Three column grid, visible sidebar           |
| > 1024px (desktop) | Full layout, node canvas available           |

**Mobile Considerations**:

- Node canvas is desktop-only (show simplified view on mobile)
- Touch targets minimum 44px
- Bottom navigation on mobile
- Reduced blur effects for performance
- Simplified animations

---

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#050508",
          elevated: "#0A0A0F",
          surface: "#0F0F15",
          hover: "#15151D",
        },
        inferno: {
          50: "#FFF9E6",
          100: "#FFEFB3",
          200: "#FFE580",
          300: "#FFDB4D",
          400: "#FFD11A",
          500: "#FFAD00",
          600: "#E69900",
          700: "#B37700",
          800: "#805500",
          900: "#4D3300",
        },
        plasma: {
          50: "#F5E6FF",
          100: "#E0B3FF",
          200: "#CC80FF",
          300: "#B84DFF",
          400: "#A31AFF",
          500: "#8F00FF",
          600: "#7300CC",
          700: "#5C00A3",
          800: "#460080",
          900: "#30005C",
        },
        frost: {
          5: "rgba(255, 255, 255, 0.05)",
          10: "rgba(255, 255, 255, 0.10)",
          15: "rgba(255, 255, 255, 0.15)",
          20: "rgba(255, 255, 255, 0.20)",
        },
      },
      fontFamily: {
        display: ["Monument Extended", "system-ui", "sans-serif"],
        sans: ["Satoshi", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      backdropBlur: {
        xs: "10px",
        sm: "20px",
        DEFAULT: "30px",
        lg: "40px",
        xl: "50px",
      },
      animation: {
        "fluid-fill": "fluid-fill 2s linear infinite",
        crystallize: "crystallize 0.4s ease-out forwards",
        "ambient-pulse": "ambient-pulse 3s ease-in-out infinite",
        "data-stream": "data-stream 1s linear infinite",
        "melt-out": "melt-away 0.25s ease-out forwards",
      },
      keyframes: {
        "fluid-fill": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        crystallize: {
          "0%": {
            opacity: "0",
            filter: "blur(20px)",
            transform: "scale(0.95)",
          },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" },
        },
        "ambient-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 173, 0, 0.15)" },
          "50%": {
            boxShadow:
              "0 0 40px rgba(255, 173, 0, 0.15), 0 0 60px rgba(143, 0, 255, 0.15)",
          },
        },
        "melt-away": {
          "0%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
          "100%": {
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateY(20px)",
          },
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #FFAD00 0%, #8F00FF 100%)",
        "gradient-brand-reverse":
          "linear-gradient(135deg, #8F00FF 0%, #FFAD00 100%)",
        "gradient-brand-horizontal":
          "linear-gradient(90deg, #FFAD00 0%, #8F00FF 100%)",
      },
    },
  },
  plugins: [],
};
```

---

## Design Checklist

When implementing any page/component, verify:

- [ ] **Deep obsidian background** (`#050508`) — not pure black
- [ ] **Glassmorphic panels** with 30px blur minimum
- [ ] **Thermal gradient** for primary actions (orange → violet)
- [ ] **Satoshi font** for all UI text
- [ ] **Monument Extended** for marketing headlines and empty states
- [ ] **JetBrains Mono** for technical/node elements
- [ ] **Ambient glow** on active states (not just borders)
- [ ] **Fluid animations** for loading (never spinners)
- [ ] **Crystallize effect** for content appearing
- [ ] **Touch-friendly** targets on mobile (44px min)
- [ ] **Reference type badges** use correct colors
- [ ] **Consistent spacing** using the spacing scale
- [ ] **Marketing mode** uses fluid/chaotic aesthetics
- [ ] **Dashboard mode** uses restrained/solid aesthetics

---

## File Structure

```
apps/web/src/
├── app/
│   ├── globals.css              # CSS variables, base styles
│   └── layout.tsx               # Root layout with fonts
├── components/
│   └── ui/                      # Custom components
│       ├── button.tsx
│       ├── card.tsx
│       ├── glass-panel.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       └── ...
├── styles/
│   ├── animations.css           # Keyframe animations
│   ├── glass.css                # Glassmorphism utilities
│   └── marketing.css            # Marketing-specific styles
└── lib/
    └── fonts.ts                 # Font configuration
```

---

_This design system embodies the "Molten Logic" philosophy — raw AI creativity forged into professional video productions. Follow it consistently to create a cohesive, cinematic experience._
