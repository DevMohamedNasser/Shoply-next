"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
import { Heart, LoaderCircle } from "lucide-react";
import {
  addToWishlist,
  getUserWishlist,
} from "@/app/services/wishlist.service";
import { useEffect, useState, useTransition } from "react";
import { IWishilst } from "@/interfaces/wishlist.interface";
import { removeFromWishlist } from "../../app/services/wishlist.service";
import { useRouter } from "next/navigation";

export default function AddToWishlistBtn({
  productId,
  ...props
}: {
  [key: string]: string;
  productId: string;
}) {
  const router = useRouter();
  const { getUserDetails } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function checkWishlist() {
      const res = await getUserWishlist();
      if (res?.data?.some((item: IWishilst) => item.id === productId)) {
        setIsWishlisted(true);
      }
    }
    checkWishlist();
  }, [productId]);

  async function toggleWishlist(productId: string) {
    startTransition(async () => {
      if (isWishlisted) {
        const res = await removeFromWishlist(productId);
        if (!res.success && res.message === "U must login first") {
          toast.error("U must login first", {
            position: "top-right",
          });
          router.push("/login");
          return;
        }
        if (res.success) {
          setIsWishlisted(false);
          toast.success(res.message, {
            position: "top-right",
          });
          getUserDetails();
        } else {
          toast.error(res.message, {
            position: "top-right",
          });
        }
      } else {
        const res = await addToWishlist(productId);
        if (res.success) {
          setIsWishlisted(true);
          toast.success(res.message || "Added to cart successfully", {
            position: "top-right",
          });
          getUserDetails();
        } else {
          toast.error(res.message, {
            position: "top-right",
          });
        }
      }
    });
  }

  return (
    <div>
      <Button
        disabled={isPending}
        className="cursor-pointer"
        {...props}
        onClick={() => toggleWishlist(productId)}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Heart
            className={`${
              isWishlisted ? "fill-yellow-400" : "fill-white"
            } text-2xl`}
          />
        )}
      </Button>
    </div>
  );
}
