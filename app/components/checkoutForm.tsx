"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import formatPrice from "@/util/PriceFormat";
import { useCartStore } from "@/store";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: String;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const cartStore = useCartStore();
  /* Total price */
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  return (
    <form className="my-8 width-full" onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "accordion" }} />
      <h2 className="font-bold my-8 text-gray-600">Total: {formattedPrice} </h2>
      <button
        id="submit"
        disabled={isLoading || !stripe || !elements}
        className="py-4 px-8 w-full bg-amber-400 cursor-pointer hover:bg-amber-500 text-gray-700 hover:text-black rounded-md text-sm font-bold transition-all disabled:opacity-25"
      >
        <span id="button-text">
          {isLoading ? <span>Processing 👀</span> : <span>Pay Now 💳</span>}
        </span>
      </button>
    </form>
  );
}
