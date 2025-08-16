"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from 'lucide-react';

interface PriceConverterProps {
  price: number;
  symbol: string;
}

export default function PriceConverter({ price, symbol }: PriceConverterProps) {
  const [cryptoValue, setCryptoValue] = useState("1");
  const [usdValue, setUsdValue] = useState(price.toString());

  const handleCryptoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCryptoValue(value);
    const converted = parseFloat(value) * price;
    setUsdValue(isNaN(converted) ? "" : converted.toFixed(2));
  };

  const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsdValue(value);
    const converted = parseFloat(value) / price;
    setCryptoValue(isNaN(converted) ? "" : converted.toFixed(6));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Converter</CardTitle>
        <CardDescription>
            Convert between {symbol} and USD.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="crypto-input">{symbol}</Label>
            <Input
              id="crypto-input"
              type="number"
              value={cryptoValue}
              onChange={handleCryptoChange}
              placeholder="0.00"
            />
          </div>
           <ArrowRightLeft className="mt-8 h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex-1 space-y-2">
            <Label htmlFor="usd-input">USD</Label>
            <Input
              id="usd-input"
              type="number"
              value={usdValue}
              onChange={handleUsdChange}
              placeholder="0.00"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
