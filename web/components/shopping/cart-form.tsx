"use client";

import { Product } from "@/types/interface";
import { NavbarDefault } from "../header/navbar-form";

interface CartProduct extends Product  {
  qty: number;
  selected: boolean;
}

export function CartItem() {

  return (
    <main>
      <NavbarDefault />
    </main>
  );
}
