"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import { useCartStore } from "@/store";
import { PiShoppingBagLight } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={"/"}>
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* Toggle cart */}
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={() => cartStore.toggleCart()}
        >
          <PiShoppingBagLight />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-teal-700 text-white text-xs font-light w-5 h-5 rounded-full absolute left-[1.25rem] bottom-4 flex items-center justify-center "
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* If the user is not signed in */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user?.name as string}
              width={36}
              height={36}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
