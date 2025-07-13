"use client";

import { useCart } from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/layout/header";
import { CircleCheckBig } from "lucide-react";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [succes, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Order placed successfully!");
    clear();
    setSuccess(true);
  };

  const inputClassName = "!rounded-[4px] !text-[12px]";

  const SuccessPage = () => {
    return (
      <div>
        <CircleCheckBig size={80} className="mx-auto mb-1" />
        <p className="font-bold text-xl text-center mb-4">Order confirmed! </p>
        <p className="mb-4 text-center">We’re getting your items ready.</p>
        <p className="text-right">
          Order id: MC#<span>{crypto.randomUUID().split("-")[0]}</span>
        </p>
      </div>
    );
  };
  return (
    <div className="max-w-xs mx-auto my-4">
      <div className="w-fit mx-auto mb-4">
        <Logo />
      </div>
      <div className="px-4 pt-4 pb-8 space-y-8 border rounded-[4px]">
        <h1 className="text-xl font-bold">Checkout</h1>
        {succes ? (
          <SuccessPage />
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-2">
              <p className="font-semibold">Order summary</p>
              {items.slice(0, 4).map((item) => (
                <div key={item.id} className="flex text-sm justify-between">
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              {items.length > 4 && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      +{items.length - 4} more items
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      {items.slice(4).map((item) => (
                        <div
                          key={item.id}
                          className="flex text-sm justify-between"
                        >
                          <p>
                            {item.name} x {item.quantity}
                          </p>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <p>Total:</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <Input
                type="text"
                placeholder="Full Name"
                value={form.name}
                className={inputClassName}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                className={inputClassName}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Shipping Address"
                value={form.address}
                className={inputClassName}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <div className="flex flex-col items-center gap-[8px]">
                <Button type="submit" className="w-full">
                  Place Order
                </Button>
                <Link
                  className="text-[12px] hover:border-b border-primary"
                  href="/cart"
                >
                  Go to cart
                </Link>
              </div>
            </form>
          </>
        )}
        <div className="w-full text-center">
          <Link className="text-[12px] border-b border-primary" href="/">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
