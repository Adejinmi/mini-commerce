import { Loader2Icon } from "lucide-react";

export default function MyLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2Icon className="animate-spin size-[10%]" />
    </div>
  );
}
