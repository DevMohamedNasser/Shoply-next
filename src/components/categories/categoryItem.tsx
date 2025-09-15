import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interfaces/category.interface";

export default function CategoryItem({ category }: { category: ICategory }) {
  return (
    <div>
      <div className="border rounded-sm hover:text-gray-700">
        <picture className="relative group overflow-hidden">
          <Link href={`/categories/${category._id}`}>
            <Image
              src={category.image}
              alt={category.name}
              width={200}
              height={270}
              className="w-full mb-4 object-contain bg-gray-50 h-[15.625rem]"
            />
            <h3 className="font-medium text-center mb-2">{category.name}</h3>
          </Link>
        </picture>
        
      </div>
    </div>
  );
}
