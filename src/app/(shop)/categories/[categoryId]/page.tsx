import React from "react";
import { getSubCategories } from "@/app/services/categories.service";
import { ISubcategory } from "@/interfaces/subcategory.interface";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

export default async function BrandDetails({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  //   console.log('categoryId', categoryId);
  const { data: subCategories } = await getSubCategories(categoryId);
  console.log("subCategories", subCategories);

  return (
    <section className="pb-20  pt-7 px-4 md:px-0">
      <Table className="md:w-xl mx-auto">
        <TableCaption>Choose from subcategories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subcategory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategories && subCategories.length == 0 ? (
            <TableRow>
              <TableCell className="flex items-center gap-x-5">
                <PackageOpen className={"text-green-700"} />
                Empty! Products will be available soon.
              </TableCell>
            </TableRow>
          ) : (
            subCategories.map((subCategory: ISubcategory) => (
              <TableRow key={subCategory._id}>
                <Link href={`/categories/${categoryId}/${subCategory._id}`}>
                  <TableCell className="flex items-center gap-x-5">
                    <PackageOpen className={"text-green-700"} />
                    {subCategory.name}
                  </TableCell>
                </Link>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
