# AGENTS.md — ShipKaro Shipped Directory

## Project Goal

Build a single responsive web page for the ShipKaro “Shipped” directory.

The page displays products shipped by the ShipKaro community using data from `products.json`.

The final page should feel like it belongs on:

`https://shipkaro.dev/shipped`

## Tech Stack

Use:

* React
* Vite
* TypeScript
* Tailwind CSS

Do not use Next.js unless explicitly asked.

## Core Rules

* Read all products from `products.json`.
* Do not hardcode product cards.
* Every product must render even if `icon`, `city`, or `link` is `null`.
* If `icon` is missing, show a clean letter avatar using the product name.
* If `city` is missing, hide the city or show a subtle fallback.
* If `link` is missing, do not show a broken button.
* Keep the app static and fast.

## Required Card Content

Each product card must include:

* Product icon or fallback letter avatar
* Product name
* Type badge
* One-line description
* Builder name
* City if available
* External link button if `link` exists

## Bonus Features

Implement these for extra score:

* Search by product name and description
* Filter by product type
* Sort by:

  * Name
  * Type
  * Has link
* Live count text, for example:

  * `71 products shipped`
  * `12 products found`

## Brand Direction

Match the ShipKaro style.

Use a light paper theme, not dark mode.

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

Use:

* Instrument Serif for display headings
* Inter for body text
* JetBrains Mono for labels, badges, and small UI text

## Design Style

The UI should be:

* Light
* Clean
* Premium
* Soft
* Rounded
* Spacious
* Modern

Use:

* Rounded corners between `14px` and `22px`
* Subtle borders
* Soft shadows
* Hover lift effect
* Purple accents
* Paper-like background
* Clean responsive grid

Avoid:

* Dark theme
* Overcrowded cards
* Hard shadows
* Too many colors
* Generic Bootstrap-style UI

## Suggested Page Structure

Use this layout:

1. Header / Hero

   * Small label: `SHIPKARO COMMUNITY`
   * Main title: `Products shipped by the ShipKaro community`
   * Short subtitle
   * Live count

2. Controls

   * Search input
   * Type filter dropdown/buttons
   * Sort dropdown

3. Product Grid

   * Responsive cards
   * 1 column mobile
   * 2 columns tablet
   * 3 columns desktop

4. Empty State

   * Show a friendly empty state if no products match search/filter.

## Code Quality Rules

* Use TypeScript types for product data.
* Keep components small and readable.
* Prefer reusable components:

  * `ProductCard`
  * `ProductGrid`
  * `SearchBar`
  * `TypeFilter`
  * `SortSelect`
* Keep filtering/sorting logic clear.
* Avoid unnecessary dependencies.
* Avoid overengineering.

## Performance Rules

* Keep bundle small.
* Do not add heavy UI libraries.
* Do not fetch external APIs.
* Use local `products.json`.
* Optimize images/icons if used.
* Ensure Lighthouse performance is high.

## Accessibility Rules

* Use semantic HTML.
* Use proper button and input labels.
* External links should open safely with:

  * `target="_blank"`
  * `rel="noreferrer"`
* Ensure good color contrast.
* Cards should be keyboard-friendly.

## Deployment Target

The project should be deployable to:

* Vercel
* Netlify
* GitHub Pages

Preferred: Vercel.

## Final Checklist

Before completion, verify:

* `npm run build` works.
* No TypeScript errors.
* No hardcoded product cards.
* Search works.
* Filter works.
* Sort works.
* Missing `icon`, `city`, and `link` cases look good.
* Responsive design works on mobile and desktop.
* Page matches ShipKaro light purple brand.
