# Snap Shot

A React photo gallery with category routes for mountains, beaches, birds, and
food, plus a search route. The gallery uses the Pexels API when configured and
includes a small curated preview gallery for local use without an API key.

## Run locally

```sh
npm install
npm run dev
```

To load 30 live results per page and search arbitrary topics, create a
`.env.local` file in this directory and add your Pexels API key:

```sh
VITE_PEXELS_API_KEY=your_pexels_api_key
```

Restart the development server after setting the key. Do not commit your
`.env.local` file.
