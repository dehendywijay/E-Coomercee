"use client";

import { Product } from "@/types/interface";
import { NavbarDefault } from "../header/navbar-form";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/context/authcontext";

interface CartProduct extends Product  {
  qty: number;
  selected: boolean;
}

const calcFinalPrice = (p: Product) => {
  const disc = p.discountPercentage ?? 0;
  const final = Math.round(p.originalPrice * (1 - disc / 100));
  return final;
};

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

   const allSelected = useMemo(
    () => cartProducts.length > 0 && cartProducts.every((p) => p.selected),
    [cartProducts]
  );

  const selectedCount = useMemo(
    () => cartProducts.filter((p) => p.selected).length,
    [cartProducts]
  );

  const total = useMemo(() => {
    return cartProducts
      .filter((p) => p.selected)
      .reduce((sum, p) => sum + calcFinalPrice(p) * p.qty, 0);
  }, [cartProducts]);

  const toggleAll = (checked: boolean) => {
    setCartProducts((prev) => prev.map((p) => ({ ...p, selected: checked })));
  };

  const toggleOne = (id: string, checked: boolean) => {
    setCartProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: checked } : p))
    );
  };

  const incQty = (id: string) => {
    setCartProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextQty = Math.min(p.qty + 1, p.stock); 
        return { ...p, qty: nextQty };
      })
    );
  };

  const decQty = (id: string) => {
    setCartProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    );
  };

  const removeItem = (id: string) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <main>
      <NavbarDefault />
    </main>
  );
}
