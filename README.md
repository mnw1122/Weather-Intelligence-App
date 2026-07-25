# Weather Intelligence App

A Weather Intelligence App built with React, TypeScript, and Vite.
This app fetches data from the public Open-Meteo APIs directly in the browser and is optimized for static deployments like Cloudflare Pages.

## Features
- City search with Geocoding API integration.
- Current weather display.
- 7-day forecast visualization using Recharts.
- Simple planning recommendations based on current weather.
- Error handling with explicit "City not found" message.

# 🚀 Deployment Guide: Google AI Studio to GitHub & Cloudflare Pages
This guide walks you through syncing and pushing your web application in Google AI Studio with GitHub repository, and setting up continuous automated deployment on Cloudflare Pages.

## Direct Sync from Google AI Studio
1. **Open Export Menu:** Click the **Export to GitHub** (or **GitHub** icon) in the top header of Google AI Studio.
2. **Authorize:** Click **Connect Account** to authorize Google AI Studio with your GitHub account.
3. **Push Code:** Enter a repository name, select visibility (**Public** or **Private**), and click **Push**.

## Deploying to Cloudflare Pages
Follow these steps to deploy this repository to **Cloudflare Pages**:
### 1. Connect to Cloudflare
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages**.
3. Select **Connect to Git** and choose **GitHub**.
### 2. Authorize GitHub Access
1. Grant Cloudflare access to your GitHub account.
2. Select **Only select repositories** and pick this repository.
3. Click **Install & Authorize**.
### 3. Configure & Deploy
1. Select this repository from your list and click **Begin setup**.
2. Configure your project build settings:
   - **Framework Preset:** *(Select your framework, e.g., React, Vite, Next.js)*
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist` *(or `build`/`out` depending on your setup)*
3. Add any required **Environment Variables** under the advanced options.
4. Click **Save and Deploy**.
---
> **Note:** Pushes to the production branch will automatically trigger new live deployments. Pull requests will generate temporary preview URLs.

## Setup and Run Instructions Locally

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```

### Development
Start the development server:
```sh
npm run dev
```

### Production Build
Create a production build for Cloudflare Pages:
```sh
npm run build
```
The output will be placed in the `dist` directory, which can be deployed to Cloudflare Pages.


