import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

interface YahooQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tickers } = body;

    if (!tickers || !Array.isArray(tickers)) {
      return NextResponse.json({ error: 'Invalid or missing tickers array' }, { status: 400 });
    }

    const results = await Promise.all(
      tickers.map(async (ticker: string) => {
        try {
          const quote = await yahooFinance.quote(ticker) as unknown as YahooQuote;
          return {
            symbol: quote.symbol,
            price: quote.regularMarketPrice,
            changePercent: quote.regularMarketChangePercent
          };
        } catch (error) {
          console.error(`Error fetching data for ${ticker}:`, error);
          return null; // Return null for invalid tickers to filter out later
        }
      })
    );

    // Filter out any failed requests
    const validResults = results.filter(Boolean);

    return NextResponse.json(validResults);
  } catch (error) {
    console.error('Stocks API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}