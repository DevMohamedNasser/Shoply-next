import React from "react";
import ProductItem from "@/components/products/ProductItem";
import { getUserWishlist } from "../services/wishlist.service";
import { IWishilst } from "@/interfaces/wishlist.interface";
import AddToWishlistBtn from "@/components/wishlist/AddToWishlistBtn";
export const dynamic = "force-dynamic";


export default async function WishlistPage() {
  const { data: products }: { data: IWishilst[] } = await getUserWishlist();
  console.log("All Wishlist Products", products);

  return (
    <>
      <section className="pb-20 pt-7">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {products &&
              products.map((product) => (
                <div className="relative" key={product._id}>
                  <ProductItem product={product} />
                  <AddToWishlistBtn
                    className="absolute top-0 start-0"
                    productId={product._id}
                    variant={"outline"}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
