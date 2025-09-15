"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/services/cart.services";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  [key: string]: string;
  productId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { getUserDetails } = useCart();
  async function addProductToCart(productId: string) {
    startTransition(async () => {
      const res = await addToCart(productId);
      if (!res.success && res.message === "U must login first") {
        toast.error("U must login first", {
          position: "top-right",
        });
        router.push('/login');
        return;
      }

      console.log("ppppppppppppppppppppppppppppp", res);

      if (res.success) {
        toast.success(res.message || "Added to cart successfully", {
          position: "top-right",
        });
        getUserDetails();
      } else {
        toast.error(res.message, {
          position: "top-right",
        });
      }
    });
  }

  return (
    <div>
      <Button
        disabled={isPending}
        className="cursor-pointer"
        {...props}
        onClick={() => addProductToCart(productId)}
      >
        {isPending ? (
          <LoaderCircle className={"animate-spin"} />
        ) : (
          "Add To Cart"
        )}
      </Button>
    </div>
  );
}
