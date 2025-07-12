"use client";

import { CartItem, useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, ShoppingCartIcon, Trash2 } from "lucide-react";
import MyLoader from "@/components/mLoader";
import { toast } from "sonner";
import { useMemo } from "react";
import debounce from "lodash.debounce";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const updateQty = useCart((s) => s.updateQty);
  const hydrated = useCart((s) => s.hydrated);
  const clear = useCart((s) => s.clear);
  const add = useCart((s) => s.add);

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const removeItem = useMemo(
    () =>
      debounce((item: CartItem) => {
        const { id, name, quantity } = item;
        remove(id);

        toast.success(`${name} removed from cart`, {
          action: {
            label: "Undo",
            onClick: () => {
              for (let i = 0; i < item.quantity; i++) {
                add(item);
              }
            },
          },
        });
      }, 300),
    [remove, add]
  );

  if (!hydrated) return <MyLoader />;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Button asChild>
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <div className="sm:text-2xl text-xl font-bold inline-flex items-center gap-2">
          <ShoppingCartIcon />{" "}
          <span className="hidden sm:block">Your Cart</span>
          <Button
            variant="outline"
            className="text-[12px] !px-2 !py-1 !h-fit border-red-300 cursor-pointer"
            onClick={clear}
          >
            Clear cart
          </Button>
        </div>
        <p className="font-[700] text-[20px]">Mini Commerce</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-20 h-20 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex gap-[2px] items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Button
                      className="size-[12px] !p-0 cursor-pointer"
                      variant="link"
                      onClick={() => {
                        updateQty(item.id, item.quantity + 1);
                      }}
                    >
                      <ChevronUp className="size-[12px]" />
                    </Button>
                    <Button
                      disabled={item.quantity <= 1}
                      className="size-[12px] !p-0 cursor-pointer"
                      variant="link"
                      onClick={() =>
                        item.quantity > 1
                          ? updateQty(item.id, item.quantity - 1)
                          : removeItem(item)
                      }
                    >
                      <ChevronDown className="size-[12px]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => removeItem(item)}
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-lg font-semibold">
          Total: <span className="text-primary">${total.toFixed(2)}</span>
        </p>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button disabled>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
