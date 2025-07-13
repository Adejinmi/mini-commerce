"use client";

import Link from "next/link";
import { HomeIcon, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import SearchBar from "../searchBar";

export default function Header() {
  const items = useCart((s) => s.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 bg-background p-4 flex justify-between shadow-md">
      <Link href="/" className="flex gap-[5px] items-center">
        <HomeIcon />
        <p className="font-[700] text-[20px] hidden sm:block">Mini Commerce</p>
      </Link>

      <SearchBar />

      <Button variant="outline" size="icon" asChild>
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-primary text-background rounded-full px-1.5">
              {totalQty}
            </span>
          )}
        </Link>
      </Button>
    </header>
  );
}
