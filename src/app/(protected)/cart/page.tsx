"use client";
import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cartContext";
import {
  clearUserCart,
  removeFromCart,
  updateQtyProductCart,
} from "../../services/cart.services";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle, X } from "lucide-react";

export default function CartPage() {
  const [isPendingRemove, setTransitionRemove] = useTransition();
  const [isPendingUpdate, setTransitionUpdate] = useTransition();
  const { cartDetails, setCartDetails } = useCart();
  // console.log("cartttttttt details", cartDetails);

  async function removeCartItems() {
    setTransitionRemove(async () => {
      const res = await clearUserCart();
      if (res.message === "success") {
        toast.success("Cart removed successfully", {
          position: "top-right",
        });
        setCartDetails(null);
      } else {
        toast.error("Cart is empty!", {
          position: "top-right",
        });
      }
    });
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    console.log(res.data);
    setCartDetails(res.data);

    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
  }

  async function updateQuantityProductCart(productId: string, qty: number) {
    setTransitionUpdate( async () => {
      const res = await updateQtyProductCart(productId, qty);
    console.log(res.data);
    setCartDetails(res.data);

    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
    } )
  }

  return (
    <section className={"py-20 pt-7"}>
      <div className="container">
        {cartDetails ? (
          <>
            <section className="mb-20">
              <Table className="mb-6 overflow-x-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails.data.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            className="cursor-pointer absolute -top-0.5 -start-0.5 h-5 min-w-5 rounded-full"
                            variant={"destructive"}
                          >
                            <X />
                          </Badge>

                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={54}
                            height={54}
                          />
                          <h3>{product.product.title}</h3>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-4 items-center">
                          <Button disabled={isPendingUpdate}
                            onClick={() =>
                              updateQuantityProductCart(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            { isPendingUpdate ? <LoaderCircle className="animate-spin" /> : '-'}
                          </Button>
                          {product.count}
                          <Button disabled={isPendingUpdate}
                            onClick={() =>
                              updateQuantityProductCart(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            { isPendingUpdate ? <LoaderCircle className="animate-spin" /> : '+'}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.price * product.count} EGP
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between">
                <Button variant={"outline"} asChild>
                  <Link href={"/products"}>Return to shop</Link>
                </Button>

                <Button disabled={isPendingRemove}
                  className="cursor-pointer"
                  variant={"destructive"}
                  onClick={removeCartItems}
                >
                  {isPendingRemove ? <LoaderCircle className="animate-spin" /> : 'Remove All'}
                </Button>
              </div>
            </section>
            <section className="flex justify-between flex-col md:flex-row">
              <div className="flex items-center md:w-5/12 gap-4">
                <Input placeholder="Coupon Code" />
                <Button className="cursor-pointer" variant={"destructive"}>
                  Apply Coupon Code
                </Button>
              </div>
              <div className="mt-3 md:w-5/12 py-8 px-6 border border-gray-950 rounded-sm">
                <h2 className="font-bold mb-6 text-xl">Cart Total</h2>
                <ul className="divide-y">
                  <li className="py-6 flex justify-between">
                    <span>Subtotal:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button
                    className="cursor-pointer"
                    variant={"destructive"}
                    asChild
                  >
                    <Link href={"/checkout"}>Proceed to checkout</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3">
            {/* <h2 className="text-2xl font-semibold">Cart is empty!</h2> */}
            <Button variant={"destructive"} asChild>
              <Link href={"/products"}>Return to shop</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
