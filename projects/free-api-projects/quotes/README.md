# Quotes

A quote browser built with React + Vite

## Live link: https://quotes-ten-zeta.vercel.app/

## Features

- "Quote of the Day" hero card with a refresh button
- Search quotes by content or author
- Filter by tag
- Like quotes (persisted in `localStorage`)
- Copy quote to clipboard
- Server-side pagination

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/public/quotes`

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── QuoteOfDay.jsx
│   ├── FilterBar.jsx
│   ├── QuoteGrid.jsx
│   └── Pagination.jsx
├── App.jsx
└── main.jsx
```
