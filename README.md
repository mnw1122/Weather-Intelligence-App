# Weather Intelligence App

A production-ready Weather Intelligence App built with React, TypeScript, and Vite.
This app fetches data from the public Open-Meteo APIs directly in the browser and is optimized for static deployments like Cloudflare Pages.

## Features
- City search with Geocoding API integration.
- Current weather display.
- 7-day forecast visualization using Recharts.
- Simple planning recommendations based on current weather.
- Error handling with explicit "City not found" message.

## Setup and Run Instructions

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
