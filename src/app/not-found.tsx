"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <main className="fixed h-dvh w-full flex items-center justify-center">
      <div className="flex flex-col gap-[16px] items-center">
        <h1 className="font-[600] text-[38px]">404</h1>
        <p>
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button variant="outline" asChild>
          <Link href={"/"}>
            Go to shop <ArrowRight />
          </Link>
        </Button>
      </div>
    </main>
  );
}
