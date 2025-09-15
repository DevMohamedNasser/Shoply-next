import Image from "next/image";
import { Star } from "lucide-react";
// import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product.interface";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";


export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <div className="">
        <picture className="relative group overflow-hidden">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={270}
              height={250}
              className="w-full mb-4 object-contain bg-gray-100 h-[15.625rem]"
            />
          </Link>
          {/* <Button className="w-full absolute bottom-0 translate-y-1/2 group-hover:translate-y-0 invisible group-hover:visible">
            Add To Cart
          </Button> */}
          <AddToCartBtn productId={product._id} className="w-full absolute bottom-0 translate-y-1/2 group-hover:translate-y-0 invisible group-hover:visible" />
        </picture>
        <h3 className="font-medium mb-2">
          <Link href={`/products/${product._id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center gap-x-2">
          <span className="font-medium text-red-500">{product.price} EGP</span>
          <div className="flex items-center gap-x-1">
            <Star className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-500 line-clamp-1">
              {product.ratingsAverage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
