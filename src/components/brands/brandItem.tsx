import Image from "next/image";
import Link from "next/link";
import { IBrands } from "@/interfaces/brand.interface";

export default function BrandItem({ brand }: { brand: IBrands }) {
  return (
    <div>
      <div className="border rounded-sm hover:text-gray-700">
        <picture className="relative group overflow-hidden">
          <Link href={`/brands/${brand._id}`}>
            <Image
              src={brand.image}
              alt={brand.name}
              width={200}
              height={270}
              className="w-full mb-4 object-contain bg-gray-50 h-[15.625rem]"
            />
            <h3 className="font-medium text-center mb-2">{brand.name}</h3>
          </Link>
        </picture>
        
      </div>
    </div>
  );
}
