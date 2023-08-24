"use client";
import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  id,
  name,
  unit_amount,
  quantity,
  image,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    cartStore.addProduct({ id, image, unit_amount, quantity, name });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };
  return (
    <>
      <button
        onClick={handleAddToCart}
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😄</span>}
      </button>
    </>
  );
}
