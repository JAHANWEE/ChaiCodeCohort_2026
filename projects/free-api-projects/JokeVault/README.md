# JokeVault 🃏

A minimal joke viewer built with Vite + React. Fetches a random joke from the [FreeAPI](https://freeapi.app) public jokes endpoint on every button click.

**Live link** https://joke-vault-chi.vercel.app/

## Preview

Black background, light yellow text, centered card — click the button, get a joke.

## Tech Stack

- [Vite](https://vite.dev/) — build tool
- [React 19](https://react.dev/) — UI
- Raw CSS — no frameworks or libraries

## API

**Endpoint:** `GET https://api.freeapi.app/api/v1/public/randomjokes/joke/random`

Returns a single random joke as JSON:

```json
{
  "data": {
    "id": 42,
    "content": "Why don't scientists trust atoms? Because they make up everything.",
    "categories": []
  }
}
```

## Getting Started

```bash
cd jokes-viewer
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── App.jsx       # All app logic — fetch + render
├── App.css       # All styles
├── index.css     # Reset only
└── main.jsx      # React entry point
```
