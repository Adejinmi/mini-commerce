import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/fetcher";
import ProductDetail from "@/components/productDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = { params: { slug: string } };

export default async function ProductPage({ params }: Params) {
  const products = await fetchProducts();
  const product = products.find((p) => p.slug === params.slug);
  const alsoBought = products
    .filter((p) => p.slug !== params.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!product) return notFound();

  return (
    <>
      <Button variant={"link"} asChild className="md:mx-[50px] p-6">
        <Link href={"/"}>
          <ArrowLeft />
          Go back
        </Link>
      </Button>
      <ProductDetail product={product} alsoBought={alsoBought} />;
    </>
  );
}
