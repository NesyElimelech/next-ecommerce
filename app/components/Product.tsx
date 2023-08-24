import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductTypes";
import Link from "next/link";

export default function product({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/products/${id}`,
        query: {
          name,
          image,
          unit_amount,
          id,
          description,
          features,
        },
      }}
    >
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-screen h-64 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {unit_amount !== null ? formatPrice(unit_amount) : "NaN"}
          </h2>
        </div>
      </div>
    </Link>
  );
}
