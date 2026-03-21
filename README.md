# OmniBrief

OmniBrief is a minimalist, client-side heavy web application that generates personalized daily news digests. It cuts through the noise of modern media by using AI to summarize the most important stories into simple, readable cards based on your specific interests and preferred tone.

## Features

* **Personalized Feeds**: Choose your categories (Tech, Business, Politics, etc.) and save them locally. No accounts or logins required.
* **AI Summarization**: Uses Google's Gemini 2.5 Flash model to take raw news data and rewrite it into cohesive, easy to read summaries.
* **ELI5 Mode**: Every story includes an "Explain Like I'm 5" toggle if you just want the absolute simplest version of the news.
* **Podcast Mode**: A native text-to-speech audio player that reads your daily brief out loud.
* **Market Ticker**: A scrolling marquee showing real time stock data for the tickers you care about.
* **Local Weather**: A small widget in the header that uses your browser's geolocation to show current local weather.

## Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS v4 & Framer Motion
* **State Management**: React Hooks & LocalStorage
* **AI Integration**: Vercel AI SDK & Google Generative AI
* **Data Sources**: NewsAPI for articles, Yahoo Finance for market data, Open-Meteo for weather.

## Getting Started

To run this project locally, you will need Node.js installed on your machine and a couple of free API keys.

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create a `.env.local` file in the root directory and add your API keys:
   ```env
   NEWS_API_KEY="your_newsapi_key"
   GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_key"
   ```
4. Run `npm run dev` to start the development server.
5. Open `http://localhost:3000` in your browser.

## License

This project is open source and available under the MIT License.
