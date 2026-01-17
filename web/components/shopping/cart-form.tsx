"use client";

import { Product } from "@/types/interface";
import { NavbarDefault } from "../header/navbar-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authcontext";

interface CartProduct extends Product  {
  qty: number;
  selected: boolean;
}

export function CartItem() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    const loadData= async () => {
      const products = Array.isArray(user?.cartProduct)
      ? user.cartProduct
      : [];
      setCartProducts(
        products.map((p) => ({
          ...p,
          qty: 1,
          selected: true,
        }))
      );
    };

    loadData();
    console.log("S", cartProducts)
  });
  return (
    <main>
      <NavbarDefault />
    </main>
  );
}
