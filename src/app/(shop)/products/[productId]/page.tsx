import React from "react";
import { getProductDetails } from "@/app/services/products.services";
import { IProduct } from "@/interfaces/product.interface";
import { Star } from "lucide-react";
import ProductSlider from "@/components/products/ProductSlider";
import AddToCartBtn from "@/components/products/AddToCartBtn";
import AddToWishlistBtn from "@/components/wishlist/AddToWishlistBtn";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  // console.log(productId);
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );
  // console.log(product);

  return (
    <section className="py-20  pt-7">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* <Image
              src={product.imageCover}
              alt={product.title}
              width={500}
              height={500}
              className="mx-auto"
            /> */}

            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="font-semibold text-2xl mb-4">{product.title}</h1>
            <div className="mb-4 flex items-center gap-x-1">
              <Star className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-500 line-clamp-1">
                {product.ratingsAverage}
              </span>
            </div>
            <span className="text-2xl mb-6 inline-block">
              {product.price} EGP
            </span>
            <p className="text-sm border-b border-b-gray-400 pb-6">
              {product.description}
            </p>

            {/* <Button onClick={()=> addProductToCart(product._id)} className="w-full mt-6" variant={'destructive'}>Add To Cart</Button> */}
            <div className="mt-6 grid grid-cols-12 gap-3 items-center justify-between">
              <div className="col-span-10">
                <AddToCartBtn
                  productId={product._id}
                  className="w-full"
                  variant={"destructive"}
                />
              </div>
              <div className="col-span-2">
                <AddToWishlistBtn
                  className=""
                  productId={product._id}
                  variant={"outline"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
