# ShipKaro Shipped Directory

A responsive product directory showcasing apps and tools shipped by the
ShipKaro community.

The page is designed to fit naturally into
[shipkaro.dev](https://shipkaro.dev) and follows its light paper theme,
purple brand palette, typography, component styling, and motion system.

## Features

- Responsive one, two, and three-column product grid
- Products loaded dynamically from `products.json`
- Automatic product-category discovery
- Future-proof category labels and colors
- Passive search by product name and description
- Product-type filters
- Sorting by:
  - Name
  - Product type
  - Link availability
- Live product-result count
- Product icon or generated letter-avatar fallback
- Optional builder city
- Optional external product link
- Friendly empty-search state
- Responsive desktop and mobile navigation
- Custom accessible sort menu
- ShipKaro-style reveal, hover, pulse, and floating animations
- Reduced-motion accessibility support
- Optimized off-screen card rendering

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Plain CSS for the custom ShipKaro visual and motion system

No backend, database, state-management library, or heavy UI framework is
required.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm `10+`

Check the installed versions:

```bash
node --version
npm --version
```

## Installation

Clone or download the repository, then open its directory:

```bash
cd ShipKaro_Challenge
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print the local development URL, usually:

```text
http://localhost:5173
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot-module replacement.

### Linting

```bash
npm run lint
```

Checks the TypeScript and React source for code-quality issues.

### Production Build

```bash
npm run build
```

Runs TypeScript validation and creates the optimized production build in
`dist/`.

### Production Preview

```bash
npm run preview
```

Serves the generated `dist/` build locally for final verification.

## Project Structure

```text
ShipKaro_Challenge/
├── public/
│   ├── favicon.svg
│   ├── hero_image.png
│   └── hero_image.webp
├── src/
│   ├── components/
│   │   ├── AppControls.tsx
│   │   ├── Controls.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Icons.tsx
│   │   └── ProductCard.tsx
│   ├── utils/
│   │   └── productType.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── products.json
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Dynamic Product Data

Product cards are **not hardcoded**. The application imports every record from
the root-level [`products.json`](./products.json) file:

```ts
import productsData from '../products.json'
```

Filtering, sorting, counts, cards, fallback avatars, cities, links, and
categories all derive from this data.

### Product Schema

Each product should use this structure:

```json
{
  "id": "lume-voice",
  "name": "Lume Voice",
  "type": "ai-tool",
  "description": "AI voice-to-text transcription SaaS",
  "builder": "Mudasir Hussain",
  "city": null,
  "icon": null,
  "link": "https://lumevoice.com"
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `string` | Yes | Must be unique and stable |
| `name` | `string` | Yes | Display name and searchable text |
| `type` | `string` | Yes | Used for filters, badges, and sorting |
| `description` | `string` | Yes | Displayed as a one-line summary |
| `builder` | `string` | Yes | Builder or privacy-safe community name |
| `city` | `string \| null` | Yes | Hidden when `null` |
| `icon` | `string \| null` | Yes | Uses a letter avatar when `null` |
| `link` | `string \| null` | Yes | Visit button is omitted when `null` |

## Adding a Product

Add another object to `products.json`:

```json
{
  "id": "example-product",
  "name": "Example Product",
  "type": "web",
  "description": "A short description of the shipped product",
  "builder": "Example Builder",
  "city": "Karachi",
  "icon": null,
  "link": "https://example.com"
}
```

No React component changes are required. The new product automatically becomes
part of:

- The product grid
- Search results
- Sorting
- Product counts
- Type filters

Because `products.json` is bundled at build time, deploy a new build after
changing the file.

## Dynamic Categories

Categories are also **not hardcoded into the filtering UI**.

The application discovers unique categories directly from product data:

```ts
Array.from(new Set(products.map((product) => product.type)))
```

Adding a product with an existing type automatically places it in that filter.

Adding a completely new type automatically creates:

- A new filter button
- A formatted type label
- A product badge
- A stable generated badge color
- A new category-count entry
- Full filtering and product-type sorting support

For example:

```json
{
  "type": "desktop-app"
}
```

is automatically displayed as:

```text
Desktop App
```

Established ShipKaro categories keep their preferred order. Any newly
introduced category is placed after the established categories.

Category formatting and colors are handled in
[`src/utils/productType.ts`](./src/utils/productType.ts).

## Fallback Product Avatars

If `icon` is `null`, a letter avatar is generated from the product name:

- `Lume Voice` becomes `LV`
- `Rendara` becomes `RE`
- `Qirayah (Quran App)` becomes `Q`

Names followed by punctuation use a single letter to avoid awkward output.

## Search, Filtering, and Sorting

### Search

Search is passive and updates as the user types. It matches:

- Product name
- Product description

Search comparisons are case-insensitive.

### Filtering

The type filter is generated from the types currently present in
`products.json`.

### Sorting

- **Name A–Z:** sorts products alphabetically by name
- **Product type:** sorts by raw product type, then by product name
- **Has link:** shows products with links first, then sorts by name

## Responsive Layout

- Mobile: one product per row
- Tablet: two products per row
- Desktop: three products per row

The mobile header uses a compact stacked layout and hides the decorative hero
image to reduce visual weight and download/render pressure.

## Design System

### Colors

```css
--purple: #9B6DFF;
--purple-deep: #6B4DB8;
--purple-soft: #F5F0FF;
--purple-light: #EDE6FF;
--paper: #FFFFFF;
--soft: #FAF8F4;
--ink: #0E0B14;
--ink-2: #2A2533;
--mute: #6B6677;
--rule: #E8E5EE;
```

### Fonts

- Instrument Serif for headings
- Inter for body text
- JetBrains Mono for labels, badges, and compact UI

Fonts are loaded from Google Fonts in `index.html`.

## Motion

Motion is based on the interaction language used by ShipKaro:

- Editorial content reveals
- Floating hero artwork
- Pulsing live indicators
- Card hover lift
- Purple border and color spread on card hover
- Animated sort-menu entrance
- CTA glow

Users who enable reduced motion in their operating system receive a simplified
experience through:

```css
@media (prefers-reduced-motion: reduce)
```

## Performance

The project is intentionally static and lightweight:

- Product data is bundled locally
- No API requests are required
- No large UI libraries are included
- The hero image is served as optimized WebP
- Off-screen cards use `content-visibility`
- Scroll listeners are passive and update state only when necessary
- Expensive sticky backdrop filters are avoided
- Product-card entrance animation runs once instead of during scrolling

All products are rendered on the page. Pagination is not currently used or
needed for this dataset.

## Accessibility

- Semantic headers, navigation, sections, cards, and footer
- Search input has an accessible label
- Type filters use `aria-pressed`
- Sort menu uses listbox semantics
- Escape closes the custom sort menu
- External product links include descriptive labels
- External links use safe new-tab behavior
- Visible focus behavior is provided by native browser controls
- Reduced-motion preferences are respected

## Keyboard Shortcut

Focus the search field with:

```text
Command + K
```

or on Windows/Linux:

```text
Control + K
```

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Use the default Vite configuration.
4. Set the build command to:

   ```text
   npm run build
   ```

5. Set the output directory to:

   ```text
   dist
   ```

### Netlify

Use:

```text
Build command: npm run build
Publish directory: dist
```

### GitHub Pages

For a repository subpath, configure Vite’s `base` option in `vite.config.ts`
before building.

## Validation Checklist

Before deployment, run:

```bash
npm run lint
npm run build
```

Then verify:

- Every product renders
- Search updates immediately
- Every category filter works
- All sorting modes work
- Missing icons use fallback initials
- Missing cities do not create empty spacing
- Missing links do not create broken buttons
- Mobile, tablet, and desktop layouts remain usable
- Keyboard and reduced-motion behavior work correctly

## Troubleshooting

### A new product is not visible

Confirm that:

- The JSON is valid
- The object is inside the root array
- The product has a unique `id`
- The development server or production build was restarted

### A category label looks unexpected

Use a lowercase slug such as:

```text
desktop-app
```

The interface will format it automatically.

### Production data looks outdated

`products.json` is build-time data. Rebuild and redeploy after changing it:

```bash
npm run build
```

### The development server port is already in use

Start Vite on another port:

```bash
npm run dev -- --port 5174
```

## License

This project was created for the ShipKaro Shipped Directory challenge. Product
data and ShipKaro branding belong to their respective owners.
