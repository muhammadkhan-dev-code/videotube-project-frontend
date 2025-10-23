# Frontend - YouTube Fetch (Redux Toolkit)

Simple, step-by-step setup to get the frontend running and fetch YouTube videos using Redux Toolkit.

## Prerequisites
- Node.js 16+ and npm installed
- YouTube Data API v3 enabled in Google Cloud Console
- A valid YouTube API key

## Quick Start (Windows)
1. Open PowerShell or Command Prompt and go to project folder:
   cd "d:\Carrier Path\code-with-hitesh\Backend-Chai\frontend-code"

2. Install dependencies:
   npm install

3. Create a `.env` file in the project root with these variables:
   VITE_API_BASE_URL=""
   VITE_API_KEY=your""

   Note: Vite requires env vars to start with `VITE_`. Do not commit this file.

4. Start dev server:
   npm run dev

5. Open app in browser (URL shown by dev server, usually http://localhost:5173)

6. Restart dev server after changing `.env`.

## Scripts
- npm run dev — start development server
- npm run build — build for production
- npm run preview — preview production build (Vite)

## Key Project Files
- src/api/youtubeApi.js — fetch helper for YouTube endpoints
- src/store/videosSlice.js — Redux Toolkit slice + async thunk (fetchVideos)
- src/store/index.js — store configuration
- src/store/hooks.js — typed-friendly hooks (useAppDispatch, useAppSelector)
- src/pages/Home.jsx — example component that dispatches fetchVideos on route "/"

## How it works
- The app uses an async thunk (fetchVideos) to call `fetchData` from `src/api/youtubeApi.js`.
- Fetched items are stored in Redux state under `state.videos.items`.
- Home page dispatches fetchVideos when user hits `/` to show initial videos.

## Testing the API quickly
1. Add the provided TestYouTube component (or open Home) that dispatches:
   dispatch(fetchVideos({ query: 'programming', maxResults: 12 }))

2. Open DevTools → Network to inspect the request/response.

3. Common API issues:
   - 401: Invalid API key or key restrictions. Check key, enable YouTube Data API v3, remove restrictive HTTP referrers for testing.
   - Quota errors: check Google Cloud Console quota and billing.
   - No results: try a broader query or increase maxResults.

