"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import MyLoader from "@/components/mLoader";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const { data: products = [], isLoading, error } = useProducts();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center sm:justify-items-start"
      >
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard key={product.id} product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 w-full sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div className="mx-auto w-fit flex flex-col items-center">
              <p className="text-muted-foreground px-4 py-2 rounded">
                No products found.
              </p>
              <Button variant="link">
                <Link href="/">All products</Link>
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
