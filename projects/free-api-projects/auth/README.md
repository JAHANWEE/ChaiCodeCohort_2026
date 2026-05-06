# auth.

A minimal authentication UI built with React + Vite.

## Live link : https://auth-zeta-virid.vercel.app/

## Features

- Sign in and Register with tabbed navigation
- Flash messages for success / error feedback
- Profile view with logout after successful login
- Custom `useAuth` hook encapsulating all auth logic

## Tech Stack

- React 19, Vite 8
- FreeAPI — `https://api.freeapi.app/api/v1/user`

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── FlashMessage.jsx
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── ProfileView.jsx
├── hooks/
│   └── useAuth.js
├── App.jsx
└── main.jsx
```
