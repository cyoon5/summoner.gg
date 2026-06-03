# Summoner.gg

A League of Legends analytics platform inspired by tools such as OP.GG and U.GG.  
Built with Next.js and React, this project focuses on frontend system design, UI architecture, and preparing for API-driven gameplay data visualization.

---

## Overview

Summoner.gg is a web-based dashboard for viewing League of Legends player profiles and match history in an analytics-style interface.

---

## Features (Current)

- Player profile lookup interface
- Summoner information display (name, level, profile icon)
- Match history UI layout
- Structured multi-column dashboard design
- Component-based frontend architecture using React

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- CSS Modules

---

## Current State

This project is currently in active development.

At this stage:
- Frontend layout and UI structure are implemented
- Match history and profile sections are built using static rendering and placeholder structure for layout validation
- API integration and data aggregation layers are planned for future implementation

---

## Planned Backend & Data Layer

- Integration with Riot Games API for real match data 
- PostgreSQL database for storing and aggregating match history and player statistics
- Redis caching layer to handle rate limiting and improve API performance
- Backend service for preprocessing and serving structured analytics data to the frontend
- Plan to analyze thousands of matches to get realistic and accurate statistics per champion

