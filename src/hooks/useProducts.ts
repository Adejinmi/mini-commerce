import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/fetcher";
import type { Product } from "@/components/ProductCard";

const PRODUCTS_KEY = "mini-commerce:products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      // Check if products already exist in localStorage
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) return JSON.parse(stored);

      // Otherwise, fetch from JSON and seed localStorage
      const data = await fetchProducts();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
      return data;
    },
    staleTime: Infinity,
  });
};
