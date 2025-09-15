import React from "react";

import { ICategory } from "@/interfaces/category.interface";
import CategoryItem from "@/components/categories/categoryItem";
import { getCategories } from "@/app/services/categories.service";


export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  console.log("All brands", categories);

  return (
    <>
      <section className="pb-20  pt-7">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {categories &&
              categories.map((category) => (
                <CategoryItem key={category._id} category={category} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
