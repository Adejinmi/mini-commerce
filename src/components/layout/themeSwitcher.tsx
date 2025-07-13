"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <div className="fixed bottom-[20px] right-0 z-50">
      <Button
        variant="default"
        className="!rounded-none !rounded-l-[50%] cursor-pointer"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  );
}
