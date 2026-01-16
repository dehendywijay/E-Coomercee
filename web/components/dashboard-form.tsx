"use client";

import { EmblaCarousel } from "./ui/embla";
import { NavbarDefault } from "@/components/header/navbar-form";
import { ProductCard } from "./product/product-card-home";
import { useAuth } from "@/app/context/authcontext";


export function HomeForm() {
  const { user } = useAuth();
  const products = Array.isArray(user?.allProducts)
  ? user.allProducts
  : [];

  return (
    <section>
      <NavbarDefault />
      <section className="max-w-6xl mx-auto px-6 mt-3">
        <EmblaCarousel />
      </section>
      
      <section className="mt-6">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="mb-3 text-base font-semibold">Untukmu</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((products) => (
              <ProductCard key={products.id} product={products} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
