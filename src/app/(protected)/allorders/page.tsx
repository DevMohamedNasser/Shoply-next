'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function AllOrders() {

    const router = useRouter();
   if (1 === 1)
    router.push('/');
  return (
    <section className="pb-20  pt-7">
            {/* <div className="container mx-auto">
              
    
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </div>
              <div className="flex justify-center">
                
                
              </div>
            </div> */}
          </section>
  )
}
