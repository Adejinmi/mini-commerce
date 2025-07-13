"use client";

import React from "react";

interface ProductJsonLdProps {
  name: string;
  image: string;
  description: string;
  price: number;
  id: string;
  slug: string;
  brand?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}

export default function ProductJsonLd({
  name,
  image,
  description,
  price,
  id,
  slug,
  brand = "Mini Commerce",
  currency = "USD",
  availability = "InStock",
}: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: [image],
    description,
    sku: id,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://mini-commerce-pearl.vercel.app/product/${slug}`,
      priceCurrency: currency,
      price,
      priceValidUntil: "2025-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: `https://schema.org/${availability}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
