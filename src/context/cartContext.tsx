import { getUserCart } from "@/app/services/cart.services";
import { getUserWishlist } from "@/app/services/wishlist.service";
import { ICartResponse } from "@/interfaces/cart.interface";
import { IWishlistResponse } from "@/interfaces/wishlist.interface";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  wishlistDetails: IWishlistResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>
  getUserDetails: ()=> Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null);

import React from "react";

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);
  const [wishlistDetails, setWishlistDetails] = useState<IWishlistResponse | null>(null);

  async function getUserDetails() {
    const {data: cartData} : {data: ICartResponse} = await getUserCart();
    setCartDetails(cartData);
    const wishlistData = await getUserWishlist();
    setWishlistDetails(wishlistData);
  }
  
  useEffect(() => {
    
    getUserDetails();
  }, []);

  return (
    <CartContext.Provider value={{ cartDetails, wishlistDetails, setCartDetails, getUserDetails }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be within a CartContextProvider");
  }

  return context;
}
