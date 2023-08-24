"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import {
  PiPlusCircleThin,
  PiMinusCircleThin,
  PiArrowCircleLeftThin,
} from "react-icons/pi";
import emptyCart from "@/public/emptyCart.jpg";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();

  /* Total price */
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 sm:w-full md:w-2/5  xl:w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="flex items-center text-sm font-bold gap-2 cursor-pointer border-b-2 border-b-teal-600"
          >
            <PiArrowCircleLeftThin className="text-2xl" /> check your cart 🛒
          </button>
        )}
        {cartStore.onCheckout === "cart" && (
          <>
            <button
              onClick={() => cartStore.toggleCart()}
              className="flex items-center text-sm font-bold gap-2 cursor-pointer border-b-2 border-b-teal-600"
            >
              <PiArrowCircleLeftThin className="text-2xl" /> Back to store 🏃‍♂️
            </button>
            {cartStore.cart.map((item) => (
              <motion.div key={item.id} layout className="flex py-4 gap-4">
                <Image
                  className="rounded-md h-24"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <motion.div>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2 text-lg">
                    <h2 className="text-sm">
                      Quantity:{" "}
                      <span className="font-bold"> {item.quantity}</span>
                    </h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                      className="cursor-pointer text-black"
                    >
                      <PiMinusCircleThin />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                      className="cursor-pointer text-black"
                    >
                      <PiPlusCircleThin />
                    </button>
                  </div>
                  <p className="text-sm text-teal-600">
                    {item.unit_amount &&
                      formatPrice(item.unit_amount * item.quantity!)}
                  </p>
                </motion.div>
              </motion.div>
            ))}

            {/* Checkout and Total */}
            {cartStore.cart.length > 0 && (
              <motion.div layout>
                <p className="py-4 text-sm font-bold">
                  Total: {formatPrice(totalPrice)}
                </p>
                <button
                  className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white"
                  onClick={() => cartStore.setCheckout("checkout")}
                >
                  Checkout
                </button>
              </motion.div>
            )}
          </>
        )}
        {/* Checkout form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div
              animate={{ scale: 1, opacity: 0.75 }}
              initial={{ scale: 0.5, opacity: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Ohhhh no! it's empty</h1>
              <Image
                src={emptyCart}
                alt="Empty Cart"
                width={400}
                height={400}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
