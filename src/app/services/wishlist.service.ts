'use server';

import { getUserToken } from "@/lib/server-utils";


export async function getUserWishlist() {

    try {
        const token = await getUserToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
            headers: {
                token: token as string,
            }
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}


export async function addToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return {
        data: null,
        success: false,
        message: 'U must login first'
      }
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          token: token as string,
        },
        body: JSON.stringify({productId})
      }
    );
    const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Adding to wishlist failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Added to wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: error as string || "Something went wrong!",
    };
  }
}


export async function removeFromWishlist(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json',
          token: token as string,
        },
      }
    );
    const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Removing from wishlist failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed from wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: error as string || "Something went wrong!",
    };
  }
}