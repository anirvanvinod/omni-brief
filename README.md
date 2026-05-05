# OmniBrief

OmniBrief is a minimalist, client-side heavy web application that presents personalized daily news digests. It cuts through the noise of modern media by organizing important stories into simple, readable cards based on your specific interests and preferred tone.

## Features

* **Personalized Feeds**: Choose your categories (Tech, Business, Politics, etc.) and save them locally. No accounts or logins required.
* **Static Daily Briefs**: Uses bundled brief data so the app can run fully on GitHub Pages without a server.
* **ELI5 Mode**: Every story includes an "Explain Like I'm 5" toggle if you just want the absolute simplest version of the news.
* **Podcast Mode**: A native text-to-speech audio player that reads your daily brief out loud.
* **Market Ticker**: A scrolling marquee showing real time stock data for the tickers you care about.
* **Local Weather**: A small widget in the header that uses your browser's geolocation to show current local weather.

## Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS v4 & Framer Motion
* **State Management**: React Hooks & LocalStorage
* **Deployment**: Static Next.js export hosted by GitHub Pages
* **Data Sources**: Bundled brief data, mock ticker data, and Open-Meteo for weather.

## Getting Started

To run this project locally, you will need Node.js installed on your machine.

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Run `npm run dev` to start the development server.
4. Open `http://localhost:3000` in your browser.

## GitHub Pages

This repository is configured for GitHub Pages as a static Next.js export. On every push to `main`, `.github/workflows/deploy-pages.yml` runs `npm ci`, builds the app into `out/`, and deploys that artifact to Pages.

To enable it:

1. Open the repository settings on GitHub.
2. Go to **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

The deployed URL will be `https://anirvanvinod.github.io/omni-brief/`.

GitHub Pages cannot run Next.js API routes or protect server-side API keys. The Pages build therefore uses bundled static brief data so the app works fully as a static site. For live NewsAPI and Gemini generation, deploy the original API-backed version to a server-capable host such as Vercel, Netlify Functions, Cloudflare Workers, or a small backend API.

## License

This project is open source and available under the MIT License.
