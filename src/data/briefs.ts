import type { NewsArticle } from "@/components/dashboard/NewsCard";
import type { Tone } from "@/hooks/usePreferences";

const briefLibrary: NewsArticle[] = [
  {
    id: "tech-ai-devices",
    category: "Tech",
    categoryBadge: "[Tech]",
    headline: "AI features move from demos into everyday devices",
    summary:
      "Consumer tech companies are putting more on-device AI into phones, laptops, and productivity tools. The shift is less about splashy launches and more about faster search, cleaner writing help, image editing, and assistants that can act across apps.",
    eli5Version:
      "Your gadgets are getting little helpers inside them, so they can do useful tasks faster without always asking a faraway server.",
    readTime: "2 min read",
    sources: ["https://news.google.com/search?q=consumer%20AI%20devices"],
  },
  {
    id: "business-rates",
    category: "Business",
    categoryBadge: "[Business]",
    headline: "Companies plan cautiously as borrowing costs stay in focus",
    summary:
      "Executives are still watching interest rates closely before committing to major hiring, real estate, or expansion plans. Strong firms are prioritizing cash flow, automation, and selective investment while waiting for clearer signals from central banks.",
    eli5Version:
      "Businesses are being careful with money because borrowing still costs a lot.",
    readTime: "2 min read",
    sources: ["https://news.google.com/search?q=business%20interest%20rates"],
  },
  {
    id: "world-supply-chain",
    category: "World",
    categoryBadge: "[World]",
    headline: "Global supply chains keep adapting to geopolitical risk",
    summary:
      "Manufacturers and retailers are spreading suppliers across more regions to reduce disruption risk. The result is a slower but steadier move away from single-country dependency toward regional backup capacity and more resilient logistics.",
    eli5Version:
      "Companies are making backup plans so one problem in one place does not stop everything.",
    readTime: "3 min read",
    sources: ["https://news.google.com/search?q=global%20supply%20chains"],
  },
  {
    id: "science-climate-data",
    category: "Science",
    categoryBadge: "[Science]",
    headline: "Climate data tools become more local and practical",
    summary:
      "Researchers are improving models that show climate risk at city, neighborhood, and infrastructure level. That makes the data more useful for insurers, planners, utilities, and local governments deciding where to invest.",
    eli5Version:
      "Weather and climate maps are getting better at showing what could happen in your exact area.",
    readTime: "2 min read",
    sources: ["https://news.google.com/search?q=local%20climate%20risk%20models"],
  },
  {
    id: "entertainment-streaming",
    category: "Entertainment",
    categoryBadge: "[Entertainment]",
    headline: "Streaming platforms lean harder into live events",
    summary:
      "Streaming services are using sports, concerts, and live specials to keep audiences returning at specific times. The strategy gives platforms appointment viewing, stronger ad inventory, and a reason for subscribers to stay engaged between scripted releases.",
    eli5Version:
      "Streaming apps want shows you watch right now, not just shows you can watch anytime.",
    readTime: "2 min read",
    sources: ["https://news.google.com/search?q=streaming%20live%20events"],
  },
  {
    id: "politics-digital-services",
    category: "Politics",
    categoryBadge: "[Politics]",
    headline: "Governments push more public services online",
    summary:
      "Public agencies are modernizing forms, identity checks, benefits, licensing, and appointment systems. The upside is faster access; the risk is that security, accessibility, and offline alternatives need to keep pace.",
    eli5Version:
      "More government paperwork is moving to websites, which is faster when the websites work well.",
    readTime: "2 min read",
    sources: ["https://news.google.com/search?q=government%20digital%20services"],
  },
];

function adaptTone(story: NewsArticle, tone: Tone): NewsArticle {
  if (tone === "ELI5") {
    return {
      ...story,
      summary: story.eli5Version || story.summary,
    };
  }

  if (tone === "Witty") {
    return {
      ...story,
      summary: `${story.summary} Translation: the signal is useful, but the fine print still has teeth.`,
    };
  }

  return story;
}

export async function getStaticBrief(categories: string[], tone: Tone) {
  const preferred = categories.length > 0 ? categories : ["Tech", "Business", "World"];
  const selected = briefLibrary.filter((story) => preferred.includes(story.category || ""));
  const fallback = selected.length > 0 ? selected : briefLibrary.slice(0, 4);

  return fallback.slice(0, 5).map((story) => adaptTone(story, tone));
}
