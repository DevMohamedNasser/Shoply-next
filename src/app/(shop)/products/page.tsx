import React from "react";
import {getProducts} from "@/app/services/products.services";
import { IProduct } from "@/interfaces/product.interface";

import ProductItem from "@/components/products/ProductItem";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  console.log("All Products", products);

  return (
    <>
      <section className="pb-20  pt-7">
        <div className="container mx-auto">
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {products &&
              products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
          </div>
          <div className="flex justify-center">
            
            
            {/* Pagination */}
          </div>
        </div>
      </section>
    </>
  );
}
