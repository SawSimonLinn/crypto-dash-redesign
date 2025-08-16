import type { Coin } from "@/types";
import CoinTable from "@/components/coin-table";

async function getCoins(): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const coins = await getCoins();

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Cryptocurrency Prices</h1>
      <p className="text-muted-foreground mb-8">
        A real-time overview of the top 100 cryptocurrencies by market cap.
      </p>
      <CoinTable coins={coins} />
    </div>
  );
}
