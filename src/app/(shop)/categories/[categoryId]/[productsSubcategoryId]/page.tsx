import { getProducts } from "@/app/services/products.services";
import ProductItem from "@/components/products/ProductItem";
import { IProduct } from "@/interfaces/product.interface";
import React from "react";

export default async function SubcategoriesDetails({
  params: { productsSubcategoryId },
}: {
  params: { productsSubcategoryId: string };
}) {
  console.log("params", productsSubcategoryId);
  const { data: products }: { data: IProduct[] } = await getProducts(
    40,
    `&subcategory=${productsSubcategoryId}`
  );
  console.log("products", products);

  return (
    <section className="pb-20  pt-7">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {/* {products && products.length == 0 ? 'Empty! Products will be available soon.' :
                  products.map((product: IProduct) => (
                    <ProductItem key={product._id} product={product} />
                  ))} */}

          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              🛒 Empty! Products will be available soon.
            </p>
          ) : (
            products.map((product: IProduct) => (
              <ProductItem key={product._id} product={product} />
            ))
          )}
        </div>
        <div className="flex justify-center">{/* Pagination */}</div>
      </div>
    </section>
  );
}
