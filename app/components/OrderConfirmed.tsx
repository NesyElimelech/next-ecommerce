"use client";

import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import success from "@/public/rocketship_final.json";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  const Rocket = () => {
    const options = {
      animationData: success,
      loop: true,
      autoplay: true,
    };
    const style = {
      height: 600,
    };

    const { View } = useLottie(options, style);
    return View;
  };

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const handleCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div>
        <h1 className="text-2xl font-bold py-8 text-center text-slate-500">
          Your order has been placed 🚀
        </h1>
        <h2 className="text-center font-semibold text-slate-400">
          Check your email for the receipt.
        </h2>
        <Rocket />
      </div>
      <div className="flex items-center justify-center">
        <Link href={"/dashboard"}>
          <button
            onClick={handleCheckoutOrder}
            className="mt-12 width-full text-bold text-sm uppercase bg-sky-500 hover:bg-sky-950 transition-colors cursor-pointer text-white py-4 px-12 rounded-md"
          >
            Check Your order
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
