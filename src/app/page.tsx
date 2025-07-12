"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="fixed h-dvh w-full flex items-center justify-center">
      <div className="flex flex-col gap-[16px] items-center">
        <h1 className="font-[600] text-[38px]">Mini Commerce</h1>
        <Button variant="outline" asChild>
          <Link href={"/catalogue"}>
            Let's shop <ArrowRight />
          </Link>
        </Button>
      </div>
    </main>
  );
}
