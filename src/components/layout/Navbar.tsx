"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import logoImg from '@/assets/images/cart-logo.svg'

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "../../context/cartContext";
import Image from "next/image";

const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  console.log(session, status);
  const { cartDetails, wishlistDetails } = useCart();
  // console.log('cartttttttt details', cartDetails)
  // console.log('wishlisttttttttt details', wishlistDetails)

  return (
    <section className="py-4 shadow">
      <div className="container">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2">
            <span className="text-lg font-semibold tracking-tighter flex gap-2 items-center">
              <Image src={logoImg} width={40} height={40} alt="shopping" />
              Ur Fav Shopping
            </span>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname == link.path && "underline text-red-400"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <span>loading...</span>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href={"/login"}>Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Link className="relative" href={"/wishlist"}>
                    <Heart className="size-8" />
                    {wishlistDetails && (
                      <Badge
                        className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                      >
                        {wishlistDetails.count}
                      </Badge>
                    )}
                  </Link>
                  <Link className="relative" href={"/cart"}>
                    <ShoppingCart className="size-8" />
                    {cartDetails && (
                      <Badge
                        className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                      >
                        {cartDetails.numOfCartItems}
                      </Badge>
                    )}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <User className="size-8 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {/* <DropdownMenuItem>
                        <Link href={"/allorders"}>All Orders</Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem>
                        <Link href={"/resetPassword"}>Change Password</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Link className="relative" href={"/profile"}>
                    <User className="size-8" />
                  </Link> */}
                </div>

                {/* <Link href={'/profile'}>{session?.user.name}</Link> */}
                {/* <Button
                  variant="outline"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  Sign Out
                </Button> */}
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter flex gap-x-2 items-center">
                      <Image src={logoImg} width={40} height={40} alt="shopping" />
                      Ur Fav Shopping
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        pathname == link.path && "underline text-red-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <span>loading...</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href={"/login"}>Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    // <>
                    //   <Link href={"/profile"}>{session?.user.name}</Link>
                    //   <Button
                    //     variant="outline"
                    //     onClick={() => {
                    //       signOut({ callbackUrl: "/login" });
                    //     }}
                    //   >
                    //     Sign Out
                    //   </Button>
                    // </>
                    <>
                      <div className="flex items-center gap-4">
                        <Link className="relative" href={"/wishlist"}>
                          <Heart className="size-8" />
                          {wishlistDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {wishlistDetails.count}
                            </Badge>
                          )}
                        </Link>
                        <Link className="relative" href={"/cart"}>
                          <ShoppingCart className="size-8" />
                          {cartDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {cartDetails.numOfCartItems}
                            </Badge>
                          )}
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <User className="size-8 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem>
                              <Link href={"/allorders"}>All Orders</Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                              <Link href={"/resetPassword"}>
                                Change Password
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => signOut({ callbackUrl: "/login" })}
                            >
                              Sign Out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* <Link href={'/profile'}>{session?.user.name}</Link> */}
                      {/* <Button
                        variant="outline"
                        onClick={() => {
                          signOut({ callbackUrl: "/login" });
                        }}
                      >
                        Sign Out
                      </Button> */}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
