import products from "@/data/products.json";
import type { Product } from "@/components/ProductCard";

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return products;
};
