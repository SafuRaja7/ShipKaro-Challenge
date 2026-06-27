# ShipKaro "Shipped" Directory — Build Brief

Build a single web page: a directory of products shipped by the ShipKaro community.
Best page wins a free seat in 1 Day App Cohort 3 and ships live on shipkaro.dev/shipped.

You can use ANY AI tool or agent for this (Claude Code, Cursor, Copilot, v0, Lovable, Bolt, etc).

## The data
Use the provided products.json (download it from the challenge page). It's an array; each item:
{
  "id": "lume-voice",
  "name": "Lume Voice",
  "type": "ai-tool",          // android | ios | web | ai-tool | workflow | extension | other
  "description": "AI voice-to-text transcription SaaS",
  "builder": "Mudasir Hussain", // some are "ShipKaro Member" (privacy)
  "city": null,                 // may be null
  "icon": null,                 // may be null -> fall back to a letter avatar
  "link": "https://lumevoice.com" // may be null -> handle gracefully
}
Some link/icon/city values are null on purpose. A card with none of them must still look good.

## What to build
A responsive grid of cards. Each card: icon (or letter fallback), name, type badge,
one-line description, builder + city, and a link if present. Read everything from
products.json — NO hardcoded cards.

Bonus (the 20 "extra features" points): search by name/description, filter by type,
sort (name / type / has-link), a live count ("71 products shipped").

## Brand kit — match shipkaro.dev (light + purple)
The page ships on shipkaro.dev/shipped, so build it in that site's look: a light "paper"
theme with a purple accent (NOT a dark theme).
Colors: purple #9B6DFF, purple-deep #6B4DB8, purple-soft #F5F0FF, purple-light #EDE6FF,
paper #FFFFFF, soft #FAF8F4, ink #0E0B14, ink-2 #2A2533, mute #6B6677, rule(border) #E8E5EE.
Fonts: Instrument Serif (display headings), Inter (body), JetBrains Mono (labels/mono).
Light theme. Rounded corners 14-22px. Subtle border + hover lift.
Reference the live site: https://shipkaro.dev

## Rules
1. Ship it live (GitHub Pages / Vercel / Netlify) — submit the URL.
2. Post it publicly on LinkedIn or X with #shipkaro #1dayapp and tag @WajahatKarim.
3. Build on the provided products.json.
4. Window: Sat-Sun, Jun 27-28. Closes Mon, Jun 29 · 05:00 PM PKT.
5. Your own work. AI tools encouraged — list which on the form.

## Scoring (100 pts)
It works 30 | Design quality 30 | Performance 20 | Extra features 20.
Three judges score independently; highest average wins; scores posted publicly.

Submit: https://1dayapp.shipkaro.dev/challenge.html#submit