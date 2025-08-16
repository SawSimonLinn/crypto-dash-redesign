import Link from "next/link";
import { Coins, Info } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Crypto Dash</span>
        </Link>
        <nav className="flex items-center gap-4">
            <Link href="/about" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Info className="h-4 w-4" />
                About
            </Link>
        </nav>
      </div>
    </header>
  );
}
