import React from "react";

// import ProductItem from "@/components/products/ProductItem";
import { getBrands } from "@/app/services/brands.service";
import { IBrands } from "@/interfaces/brand.interface";
import BrandItem from "@/components/brands/brandItem";

export default async function BrandsPage() {
  const { data: brands }: { data: IBrands[] } = await getBrands();
  console.log("All brands", brands);

  return (
    <>
      <section className="pb-20  pt-7">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {brands &&
              brands.map((brand) => (
                <BrandItem key={brand._id} brand={brand} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
