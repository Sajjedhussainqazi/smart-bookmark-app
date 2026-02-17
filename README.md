# Smart Bookmark App

A modern real-time bookmark manager built using Next.js, Supabase, and Tailwind CSS.

## Live Demo

https://smart-bookmark-app.vercel.app

## Features

- Google Authentication (OAuth)
- Add Bookmarks
- Delete Bookmarks
- Private per user
- Real-time sync across tabs
- Modern responsive UI

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel Deployment

## How it works

Users sign in with Google, add bookmarks, and see them update instantly across tabs using Supabase Realtime.

## Challenges faced

### 1. Realtime not updating instantly

Problem:
Realtime was not triggering properly.

Solution:
Used Supabase Realtime channels with correct user filter and auth session handling.

---

### 2. Google OAuth redirect issue in production

Problem:
After deployment, login redirected to localhost.

Solution:
Updated Supabase Authentication URL settings to include Vercel live URL.

---

### 3. Environment variables missing in Vercel

Problem:
Deployment failed due to missing Supabase keys.

Solution:
Added environment variables in Vercel project settings and redeployed.

---

## Author

Sajjed Hussain Qazi
