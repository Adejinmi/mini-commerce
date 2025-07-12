"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import MyLoader from "@/components/mLoader";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: products = [], isLoading, error } = useProducts();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const breadcrumbText = search
    ? `Search results for "${search}"`
    : "All products";

  if (isLoading) return <MyLoader />;
  if (error)
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Failed to load products.</p>
    </div>;

  return (
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
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div className="mx-auto bg-green-50 w-fit flex flex-col items-center">
              <p className="text-muted-foreground px-4 py-2 rounded">
                No products found.
              </p>
              <Button variant="link">All products</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
