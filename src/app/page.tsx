import CategoriesSection from "@/components/home/CategoriesSection";
import MainSlider from "@/components/home/MainSlider";
import ProductsSection from "@/components/home/ProductsSection";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SkeletonCard />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}
