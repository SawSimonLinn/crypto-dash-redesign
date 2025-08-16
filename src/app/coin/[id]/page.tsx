import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PriceChart from "@/components/price-chart";
import SentimentAnalyzer from "@/components/sentiment-analyzer";
import PriceConverter from "@/components/price-converter";
import { type CoinDetails, type MarketChartData } from "@/types";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Home, Link as LinkIcon } from "lucide-react";

async function getCoinDetails(id: string): Promise<CoinDetails | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMarketChart(id: string): Promise<MarketChartData | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const formatCurrency = (value: number, precision = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
}

const StatCard = ({ title, value, change, description }: { title: string; value: string; change?: number; description?: string }) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl md:text-2xl font-bold">{value}</div>
        {change !== undefined && (
           <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </p>
        )}
         {description && (
           <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
);

export default async function CoinDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [coin, chartData] = await Promise.all([
    getCoinDetails(params.id),
    getMarketChart(params.id),
  ]);

  if (!coin) {
    notFound();
  }

  const price = coin.market_data.current_price.usd;
  const explorerUrl = coin.links?.blockchain_site?.[0];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
       <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="md:hidden">
                    <Button variant="outline" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Image
                    src={coin.image.large}
                    alt={coin.name}
                    width={64}
                    height={64}
                    className="w-12 h-12 md:w-16 md:h-16"
                />
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold font-headline flex items-center gap-2">
                        {coin.name}
                        <span className="text-lg md:text-2xl text-muted-foreground uppercase">{coin.symbol}</span>
                    </h1>
                    <Badge>Rank #{coin.market_cap_rank}</Badge>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
                {explorerUrl && (
                    <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Blockchain Explorer
                        </Button>
                    </a>
                )}
                <Link href="/">
                    <Button>
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Price" value={formatCurrency(price, price < 1 ? 6 : 2)} change={coin.market_data.price_change_percentage_24h} />
        <StatCard title="Market Cap" value={formatCurrency(coin.market_data.market_cap.usd, 0)} description="Dominance" />
        <StatCard title="Volume (24h)" value={formatCurrency(coin.market_data.total_volume.usd, 0)} />
        <StatCard title="Circulating Supply" value={formatNumber(coin.circulating_supply)} description={`${coin.symbol.toUpperCase()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart (7d)</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData ? <PriceChart data={chartData} /> : <div className="h-[350px] flex items-center justify-center text-muted-foreground">Chart data not available.</div>}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 md:space-y-8">
           <SentimentAnalyzer cryptocurrency={coin.name} />
           <PriceConverter price={price} symbol={coin.symbol.toUpperCase()} />
        </div>
      </div>
      
      {coin.description.en &&
        <Card>
            <CardHeader>
                <CardTitle>About {coin.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: coin.description.en.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ') }} />
            </CardContent>
        </Card>
      }

    </div>
  );
}
