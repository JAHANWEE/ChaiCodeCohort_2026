# YouTube Video Browser

A YouTube-style video listing app built with React + Vite, powered by the [FreeAPI](https://freeapi.app) YouTube videos endpoint.

## Live Link : https://youtube-video-inky.vercel.app

## Features

- Hero banner featuring the first video on the current page
- Video grid with thumbnails, titles, and metadata
- Server-side pagination with smooth scroll

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/public/youtube/videos`

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
│   ├── HeroBanner.jsx
│   └── VideoGrid.jsx
├── App.jsx
└── main.jsx
```
