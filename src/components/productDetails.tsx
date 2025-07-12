"use client";

import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import ProductCard, { Product } from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductDetail({
  product,
  alsoBought,
}: {
  product: Product;
  alsoBought?: Product[];
}) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add(product);
    }

    toast.success(`${qty} × ${product.name} added to cart`);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="empty"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="mx-auto md:mx-[50px] p-6 flex flex-wrap"
      >
        <div className="max-w-4xl grid md:grid-cols-2 gap-10">
          <div className="relative w-full aspect-square bg-muted rounded-md overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <label htmlFor="qty" className="text-sm">
                Quantity:
              </label>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
            </div>

            <Button onClick={handleAdd}>Add to Cart</Button>
          </div>
        </div>
        {alsoBought && (
          <section>
            <h2 className="text-md font-semibold mb-4 mt-10">
              People Also Bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {alsoBought.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
