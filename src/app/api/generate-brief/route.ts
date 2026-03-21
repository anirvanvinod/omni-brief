import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export const maxDuration = 60; // Allow more time for AI generation

export async function POST(request: Request) {
  try {
    const { categories, tone } = await request.json();

    if (!categories || !Array.isArray(categories)) {
      return NextResponse.json({ error: 'Invalid categories provided' }, { status: 400 });
    }

    const newsApiKey = process.env.NEWS_API_KEY;
    if (!newsApiKey) {
      return NextResponse.json({ error: 'Missing NEWS_API_KEY in environment variables' }, { status: 500 });
    }

    // Step A: Fetch News
    const articlesData = [];

    // NewsAPI expects specific categories: business, entertainment, general, health, science, sports, technology
    const categoryMapping: Record<string, string> = {
      'Tech': 'technology',
      'Business': 'business',
      'Science': 'science',
      'Politics': 'general',
      'Entertainment': 'entertainment',
    };

    // Fetch top headlines for each requested category
    for (const cat of categories) {
      const mappedCategory = categoryMapping[cat] || 'general';
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${mappedCategory}&language=en&pageSize=4&apiKey=${newsApiKey}`
        );
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles) {
          articlesData.push(
            ...data.articles
              .filter((a: { title?: string; description?: string }) => a.title && a.description) // Ensure we have enough context
              .map((a: { source: { name: string }; title: string; description: string; url: string }) => ({
                source: a.source.name,
                title: a.title,
                description: a.description,
                url: a.url,
                category: cat
              }))
          );
        }
      } catch (err) {
        console.error(`Error fetching news for ${cat}:`, err);
      }
    }

    if (articlesData.length === 0) {
      return NextResponse.json({ error: 'Failed to fetch any suitable news articles' }, { status: 500 });
    }

    // Step B: AI Summarization using Vercel AI SDK and Google Gemini
    const promptContext = JSON.stringify(articlesData);

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'), 
      schema: z.object({
        stories: z.array(z.object({
          categoryBadge: z.string().describe("e.g., '🤖 Tech' or '💼 Business'"),
          headline: z.string(),
          summary: z.string().describe("A professional, cohesive summary block of the news stories. Combine similar events."),
          eli5Version: z.string().describe("An ultra-simple 'Explain Like I am 5' one-sentence summary."),
          readTime: z.string().describe("e.g., '2 min read'"),
          sources: z.array(z.string().url()).describe("An array of URLs to the original source articles")
        }))
      }),
      prompt: `You are an expert news editor. Take the provided raw news articles and write a cohesive, daily brief using a "${tone || 'Professional'}" tone. 
      Consolidate similar stories into a single story block where appropriate. Output exactly 4-5 premium story cards.
      
      Raw Data:
      ${promptContext}`,
    });

    return NextResponse.json(object);
  } catch (error: unknown) {
    console.error('Generate Brief API Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: 'Failed to generate AI brief', 
      details: errorMessage
    }, { status: 500 });
  }
}