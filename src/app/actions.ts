"use server";

import { analyzeMarketSentiment } from "@/ai/flows/analyze-market-sentiment";

export async function getSentimentAnalysis(
  prevState: any,
  formData: FormData
) {
  const cryptocurrency = formData.get("cryptocurrency") as string;

  if (!cryptocurrency) {
    return { data: null, error: "Cryptocurrency name is required." };
  }

  try {
    // Adding a delay to simulate a real API call and show loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you might use the real Genkit flow.
    // For this example, we'll return mock data to avoid API key issues.
    const mockSentiment = {
        sentimentSummary: `Market sentiment for ${cryptocurrency} appears mixed. While some news highlights positive developments in its ecosystem and adoption, other reports point to regulatory concerns and market volatility, creating a balanced but cautious outlook.`,
        sentimentScore: Math.random() * 2 - 1, // Random score between -1 and 1
    };

    // const result = await analyzeMarketSentiment({ cryptocurrency });
    // return { data: result, error: null };
    
    return { data: mockSentiment, error: null };

  } catch (e: any) {
    console.error(e);
    return { data: null, error: "Failed to analyze sentiment. Please try again later." };
  }
}
