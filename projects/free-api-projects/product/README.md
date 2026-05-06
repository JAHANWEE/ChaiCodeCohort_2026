# Product Store

A product browsing app built with React + Vite.

## Live link: https://product-green-phi.vercel.app

## Features

- Grid / list view toggle
- Search by title, brand, description, or category
- Filter by category and sort by price, rating, or discount
- Product detail modal
- Server-side pagination

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/public/products`

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
│   ├── ProductGrid.jsx
│   ├── ProductModal.jsx
│   └── Pagination.jsx
├── hooks/
│   └── useProducts.js
├── App.jsx
└── main.jsx
```
