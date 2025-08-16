"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Coin } from "@/types";

interface CoinTableProps {
  coins: Coin[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

type SortKey = 'market_cap' | 'current_price' | 'price_change_percentage_24h';
type SortDirection = 'asc' | 'desc';

export default function CoinTable({ coins }: CoinTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortKey, setSortKey] = useState<SortKey>('market_cap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedAndFilteredCoins = useMemo(() => {
    let filtered = coins;
    if (searchTerm) {
      filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA < valB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted.slice(0, itemsPerPage);
  }, [coins, searchTerm, itemsPerPage, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === 'desc' ? ' ▼' : ' ▲';
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
          <Input
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full md:max-w-sm"
          />
          <div className="flex gap-2">
            <Select value={sortKey} onValueChange={(value) => handleSort(value as SortKey)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market_cap">Market Cap</SelectItem>
                <SelectItem value="current_price">Price</SelectItem>
                <SelectItem value="price_change_percentage_24h">24h Change</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortDirection} onValueChange={(value) => setSortDirection(value as SortDirection)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">High to Low</SelectItem>
                <SelectItem value="asc">Low to High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Show 5</SelectItem>
                <SelectItem value="10">Show 10</SelectItem>
                <SelectItem value="20">Show 20</SelectItem>
                <SelectItem value="50">Show 50</SelectItem>
                <SelectItem value="100">Show 100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('current_price')}>
                  Price{getSortIndicator('current_price')}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('price_change_percentage_24h')}>
                  24h %{getSortIndicator('price_change_percentage_24h')}
                </TableHead>
                <TableHead className="text-right hidden md:table-cell cursor-pointer" onClick={() => handleSort('market_cap')}>
                  Market Cap{getSortIndicator('market_cap')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredCoins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {coin.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 group">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold group-hover:text-primary transition-colors">{coin.name}</span>
                        <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(coin.current_price)}</TableCell>
                  <TableCell
                    className={cn("text-right font-mono", {
                      "text-green-500": coin.price_change_percentage_24h > 0,
                      "text-red-500": coin.price_change_percentage_24h < 0,
                    })}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </TableCell>
                  <TableCell className="text-right font-mono hidden md:table-cell">
                    {formatCurrency(coin.market_cap)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
