import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/fetcher";
import ProductDetail from "@/components/productDetails";

type Params = { params: { slug: string } };

export default async function ProductPage({ params }: Params) {
  const products = await fetchProducts();
  const product = products.find((p) => p.slug === params.slug);
  const alsoBought = products
    .filter((p) => p.slug !== params.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!product) return notFound();

  return <ProductDetail product={product} alsoBought={alsoBought} />;
}
