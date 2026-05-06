# Random Users

A user directory app built with React + Vite, fetching random user profiles from the [FreeAPI](https://freeapi.app) users endpoint.

## Live link: https://random-users-henna.vercel.app/

## Features

- Grid and list view modes
- Search by name, email, or country
- Filter by gender
- User detail modal
- Stats bar showing total and filtered counts
- Server-side pagination

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/public/randomusers`

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── StatsBar.jsx
│   ├── UserGrid.jsx
│   ├── UserModal.jsx
│   └── Pagination.jsx
├── hooks/
│   └── useUsers.js
├── App.jsx
└── main.jsx
```
