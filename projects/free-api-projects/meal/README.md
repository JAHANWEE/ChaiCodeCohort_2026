# Meal Explorer

A meal discovery app built with React + Vite.

## Live link:https://meal-lime-two.vercel.app

## Features

- Browse meals with search by name, area, or category
- Filter by category (derived from current page data)
- Meal detail modal with full recipe info
- Server-side pagination with smooth scroll

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/public/meals`

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
│   ├── HeroStrip.jsx
│   ├── Controls.jsx
│   ├── MealGrid.jsx
│   ├── MealModal.jsx
│   └── Pagination.jsx
├── hooks/
│   └── useMeals.js
├── App.jsx
└── main.jsx
```
