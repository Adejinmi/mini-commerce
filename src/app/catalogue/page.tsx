"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import MyLoader from "@/components/mLoader";
import { HomeIcon, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { data: products = [], isLoading, error } = useProducts();
  const [breadcrumbText, setBreadCrumText] = useState("All products");
  const [search, setSearch] = useState<string>("");
  const items = useCart((s) => s.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (search.trim().length > 0) {
      setBreadCrumText(`Search results for "${search}"`);
    } else {
      setBreadCrumText("All products");
    }
  }, [search]);

  if (isLoading) return <MyLoader />;
  if (error)
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Failed to load products.</p>
    </div>;

  return (
    <>
      <header className="sticky top-0 z-20 bg-background p-4 flex justify-between shadow-md">
        <Link href="/" className="flex gap-[5px] items-center">
          <HomeIcon />
          <p className="font-[700] text-[20px] hidden sm:block">
            Mini Commerce
          </p>
        </Link>
        <div className="relative w-[250px] sm:w-full max-w-md flex items-center">
          <Search className="absolute left-3 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" asChild>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1.5">
                {totalQty}
              </span>
            )}
          </Link>
        </Button>
      </header>
      <div className="p-4 md:px-[50px]">
        <blockquote className="border-l-4 border-primary pl-[10px] mb-[40px] font-[600] text-[12px]">
          {breadcrumbText}
        </blockquote>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center sm:justify-items-start">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
