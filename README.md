# Design Showcase

An interactive design analysis platform built with Next.js for exploring, inspecting, and comparing frontend design systems. Render full-page designs inside responsive device frames, extract design tokens, run accessibility audits, and compare layouts side by side -- all without leaving the browser.

---

## Features

### Gallery

Browse all registered designs in a curated gallery. Each card displays metadata -- name, category, tags, and a short description -- so you can quickly find the design you're looking for.

### Design Viewer

Open any design in an isolated viewer with a live-rendered preview and a powerful side panel:

| Tab | Description |
|---|---|
| **Meta** | Name, description, author, category, inspiration, layout info, and font stacks. |
| **Tokens** | Colors, spacing, border-radius, typography scales, and shadow definitions extracted from each design's token file. |
| **Inspector** | Hover over any element to see computed dimensions, padding, margin, font properties, background color, and border-radius -- rendered as a smooth, animated overlay. |
| **A11y** | Automated accessibility audit: heading hierarchy, missing alt text, ARIA names, and WCAG 2.1 contrast ratio checks. |

The viewer also includes:

- **Viewport switching** -- Mobile (375 x 812), Tablet (768 x 1024), and Desktop (1440 x 900) presets.
- **Zoom controls** -- Manual zoom from 25 % to 150 %. Auto-fit on small screens.
- **Inspect mode** -- Locks zoom to 100 % for pixel-accurate element inspection.
- **Container-query responsive previews** -- Designs respond to the preview frame width, not the browser viewport, using `@tailwindcss/container-queries`.

### Compare

Select two designs and view them side by side in a split viewport. Switch between a **Visual** diff (live renders at any viewport size) and a **Tokens** diff (color-for-color, spacing-for-spacing comparison).

### Patterns

Browse reusable UI pattern sections (hero, navbar, features, pricing, footer, etc.) across all designs -- useful for isolating and studying individual sections.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) + [`@tailwindcss/container-queries`](https://github.com/tailwindcss/container-queries) |
| Animation | [Motion](https://motion.dev) (Framer Motion) |
| Fonts | Sora, Source Sans 3, IBM Plex Mono (via `next/font/google`) |
| Runtime | React 19 |
| Container | Docker + Docker Compose |
| Package Manager | pnpm (via Corepack) |

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose **or**
- [Node.js 20+](https://nodejs.org/) with [pnpm](https://pnpm.io/)

### Run with Docker (recommended)

```bash
# Clone the repository
git clone <repo-url> && cd design-showcase

# Start the development server
docker compose up --build -d app

# Open http://localhost:3000
```

File changes are hot-reloaded automatically via volume mounting with file-system polling.

### Run locally

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Open http://localhost:3000
```

### Production build

```bash
# Docker
docker compose --profile prod up --build -d app-prod
# Serves on http://localhost:3001

# Without Docker
pnpm build && pnpm start
```

The production Dockerfile uses a multi-stage build (deps > build > standalone runner) for a minimal final image.

---

## Project Structure

```
design-showcase/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home -- gallery + hero
│   ├── design/[slug]/page.tsx  # Design viewer
│   ├── compare/page.tsx        # Side-by-side comparisons
│   ├── patterns/[type]/        # UI pattern browser
│   ├── layout.tsx              # Root layout (fonts, navbar, footer)
│   └── globals.css             # Design system tokens (CSS custom properties)
│
├── components/
│   ├── shell/                  # Navbar, Footer
│   ├── home/                   # Hero, Features, Design Gallery
│   ├── viewer/                 # DesignViewer, ViewportControls, DeviceFrame
│   ├── compare/                # CompareViewer
│   ├── sandbox/                # DesignSandbox (container-query wrapper)
│   ├── inspector/              # InspectorOverlay (hover-to-inspect)
│   ├── tokens/                 # TokenPanel, TokenDiff
│   ├── meta/                   # MetaPanel
│   ├── a11y/                   # A11yPanel
│   ├── patterns/               # PatternViewer
│   └── ui/                     # Shared primitives (cn, etc.)
│
├── designs/                    # Add your designs here
│   ├── agency-portfolio/
│   │   ├── index.tsx           # Full-page React component
│   │   ├── meta.ts             # DesignMeta (name, tags, layout, fonts)
│   │   ├── tokens.ts           # DesignTokens (colors, spacing, radius, ...)
│   │   └── sections.ts         # Named sections for the pattern browser
│   └── startup-saas/
│       ├── index.tsx
│       ├── meta.ts
│       ├── tokens.ts
│       └── sections.ts
│
├── lib/
│   ├── registry.ts             # Design registry (slugs, lazy loaders)
│   ├── types.ts                # Shared TypeScript interfaces
│   ├── a11y-checks.ts          # Accessibility analysis engine
│   ├── motion.ts               # Shared animation presets
│   └── utils.ts                # cn() helper, color parsing
│
├── Dockerfile                  # Development image
├── Dockerfile.prod             # Multi-stage production image
├── docker-compose.yml          # Dev + prod service definitions
├── tailwind.config.ts          # Custom theme + container-query plugin
└── package.json
```

---

## Adding a New Design

1. **Create a directory** under `designs/`:

   ```
   designs/your-design/
   ├── index.tsx        # Default export: React component
   ├── meta.ts          # Named export: { meta: DesignMeta }
   ├── tokens.ts        # Named export: { tokens: DesignTokens }
   └── sections.ts      # Named export: { sections: DesignSection[] }
   ```

2. **Register the slug** in `lib/registry.ts`:

   ```ts
   export const designSlugs = ['startup-saas', 'agency-portfolio', 'your-design'] as const;
   ```

   Then add the corresponding entries to `metaLoaders`, `tokenLoaders`, `componentLoaders`, and `sectionLoaders`.

3. **Use container-query breakpoints** in your design component. Because the preview renders inside a container (not an iframe), standard media queries respond to the browser width -- not the frame. Use `@sm:`, `@md:`, `@lg:` instead of `sm:`, `md:`, `lg:`:

   ```tsx
   // Correct: responds to the preview frame width
   <div className="grid @md:grid-cols-3">

   // Incorrect: responds to the browser window
   <div className="grid md:grid-cols-3">
   ```

4. **Restart the dev server** (or let hot-reload pick it up).

### Type Reference

```ts
interface DesignMeta {
  slug: string;
  name: string;
  description: string;
  author?: string;
  date?: string;
  tags: string[];
  category: 'landing' | 'dashboard' | 'portfolio' | 'saas' | 'ecommerce';
  inspiration?: string;
  notes?: string;
  layout: {
    type: 'single-page' | 'multi-section' | 'grid-based';
    gridSystem?: string;
    maxWidth?: string;
  };
  fontStack: {
    heading: string;
    body: string;
    mono?: string;
  };
}

interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  typography: Record<string, {
    fontSize: string;
    lineHeight: string;
    fontWeight: string | number;
    letterSpacing?: string;
  }>;
  shadows: Record<string, string>;
}
```

---

## Design System

The application shell uses an **Atelier** aesthetic -- warm ivory text on deep graphite backgrounds with terracotta accents. Key design tokens are defined as CSS custom properties in `globals.css` and extended in `tailwind.config.ts`:

| Token | Tailwind Class | Value |
|---|---|---|
| Background | `bg-ink` | `#1A1917` |
| Surface | `bg-graphite` | `#232220` |
| Border | `border-ruled` | `#2E2C2A` |
| Accent | `bg-terra` | `#C2652A` |
| Primary text | `text-ivory` | `#F0EDE6` |
| Secondary text | `text-stone` | `#8A8579` |

Typography uses three stacked font families:

- **Display** -- Sora (headings, nav)
- **Body** -- Source Sans 3 (paragraphs, descriptions)
- **Mono** -- IBM Plex Mono (code, labels, UI chrome)

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Create production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format all files with Prettier |

---

## License

Private.
