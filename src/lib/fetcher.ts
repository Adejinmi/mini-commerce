import products from "@/data/products.json";
import type { Product } from "@/components/ProductCard";

export const fetchProducts = async (): Promise<Product[]> => {
  //1s delay to imitate network delay
  await new Promise((res) => setTimeout(res, 1000));
  return products;
};
