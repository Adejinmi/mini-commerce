import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/fetcher";
import ProductDetail from "@/components/productDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductJsonLd from "@/components/seo/productJsonLd";

type Params = { params: Promise<{ slug: string }> };

const getProductFromSlug = async (slug: string) => {
  const products = await fetchProducts();
  return products.find((p) => p.slug === slug);
};

export const generateMetadata = async ({ params }: Params) => {
  const { slug } = await params;
  const product = await getProductFromSlug(slug);

  if (!product) return {};

  return {
    title: product?.name,
    openGraph: {
      title: product?.name,
      description: product?.description,
      type: "website",
      images: [
        {
          url: product?.image
            ? `https://mini-commerce.vercel.app/api/og?title=${encodeURIComponent(
                product!.name
              )}&price=${product?.price}&image=${encodeURIComponent(
                product!.image
              )}`
            : `https://mini-commerce.vercel.app/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductFromSlug(slug);
  const products = await fetchProducts();
  const alsoBought = products
    .filter((p) => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!product) return notFound();

  return (
    <>
      <ProductJsonLd
        name={product.name}
        image={product.image}
        description={product.description}
        price={product.price}
        id={product.id}
        slug={product.slug}
      />
      <Button variant={"link"} asChild className="md:mx-[50px] p-6">
        <Link href={"/"}>
          <ArrowLeft />
          Go back
        </Link>
      </Button>
      <ProductDetail product={product} alsoBought={alsoBought} />
    </>
  );
}
