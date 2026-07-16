# Summoner.gg

A League of Legends analytics platform inspired by OP.GG and U.GG, built with Next.js, React, and TypeScript.

---

## Overview

Summoner.gg is a full-stack web dashboard for viewing League of Legends player profiles, match history, and in-game statistics. The project emphasizes clean architecture, separation of concerns, and efficient data fetching patterns.

---
## Screenshots
<img width="1330" height="910" alt="summoner gg profile page" src="https://github.com/user-attachments/assets/2b5b5c75-6bd4-410b-9d2d-794b4d71c38f" />

<img width="767" height="774" alt="summoner gg match details" src="https://github.com/user-attachments/assets/d8f920e2-6a00-4b6b-89a4-5946aa698a85" />

---
## Features

- Player profile lookup by summoner name, tag, and region
- Summoner profile display — icon, level, game name
- Full match history with real Riot Games API data
- Per-match stats — KDA, CS, vision score, gold earned, items, runes, summoner spells
- Champion and item icons served dynamically from Data Dragon CDN
- Team composition display for all 10 participants per match
- Relative timestamps for match dates
- Multi-region support (NA, EUW, and more via region mapping)

---

## Architecture

- **Service layer** separating data fetching, transformation, and rendering concerns
- **Server components** call Riot's API directly, avoiding unnecessary internal HTTP round trips
- **Client components** isolated only where interactivity is required
- **Parallel API fetching** with `Promise.all` for match history, reducing load time to the duration of the slowest single request rather than the sum of all requests
- **Data Dragon service** (`dragonService.ts`) centralizes all CDN asset URL construction with module-level caching for patch version and rune data — fetched once on server start, reused across all requests
- **Type-safe data pipeline** — raw Riot API responses are mapped to internal TypeScript types at the service layer, decoupling the rest of the app from Riot's API shape

---

## Tech Stack

- Next.js 15 (App Router)
- React
- TypeScript
- CSS Modules
- Riot Games API
- Data Dragon CDN

---

## Planned

- **PostgreSQL** for persisting match history and summoner data, enabling aggregated statistics without repeated Riot API calls
- **Redis** caching layer (cache-aside pattern) — check Redis first, fall back to Postgres, then Riot API. Short TTLs for match data, longer for patch assets
- **Champion analytics** — win rates, KDA trends, best items and runes per champion based on stored match data
- **Live game tracking** — polling client component showing current in-game data
- **Ranked statistics** — LP history, rank display, win/loss streaks
