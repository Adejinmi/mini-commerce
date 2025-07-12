"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCart((state) => state.add);

  return (
    <Card className="w-full sm:w-[300px] flex flex-col justify-between">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>
      </CardHeader>

      <CardContent>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground truncate">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <Button variant="outline" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
