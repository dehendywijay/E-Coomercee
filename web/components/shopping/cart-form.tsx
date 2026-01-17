"use client";

import { Product } from "@/types/interface";
import { NavbarDefault } from "../header/navbar-form";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/context/authcontext";

interface CartProduct extends Product  {
  qty: number;
  selected: boolean;
}

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

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
  },[ ]);

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

     <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Keranjang</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: CART LIST */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-violet-600"
                  checked={allSelected}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <div className="text-sm font-medium text-slate-900">
                  Pilih Semua ({cartProducts.length})
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {cartProducts.map((item) => (
                  <div key={item.id} className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-violet-600"
                        checked={item.selected}
                        onChange={(e) => toggleOne(item.id, e.target.checked)}
                      />
                      <div className="text-sm font-semibold text-slate-900">
                        {item.store?.name}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="text-sm font-medium text-slate-900">
                          {item.name}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {typeof item.discountPercentage === "number" ? (
                            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                              -{item.discountPercentage}%
                            </span>
                          ) : null}

                          <div className="text-sm font-semibold text-red-600">
                            {formatIDR(item.originalPrice)}
                          </div>

                          {typeof item.originalPrice === "number" ? (
                            <div className="text-xs text-slate-400 line-through">
                              {formatIDR(item.originalPrice)}
                            </div>
                          ) : null}
                        </div>

                        {/* Actions */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Favorite icon placeholder */}
                            <button
                              type="button"
                              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                              aria-label="Favorit"
                              title="Favorit"
                            >
                              ♡
                            </button>

                            <button
                              type="button"
                              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                              aria-label="Hapus"
                              title="Hapus"
                              onClick={() => removeItem(item.id)}
                            >
                              🗑️
                            </button>
                          </div>

                          {/* Qty control */}
                          <div className="flex items-center rounded-full ring-1 ring-slate-200">
                            <button
                              type="button"
                              className="h-9 w-10 rounded-l-full text-slate-600 hover:bg-slate-100 disabled:text-slate-300"
                              onClick={() => decQty(item.id)}
                              disabled={item.qty <= 1}
                            >
                              –
                            </button>
                            <div className="min-w-10 px-3 text-center text-sm font-medium text-slate-900">
                              {item.qty}
                            </div>
                            <button
                              type="button"
                              className="h-9 w-10 rounded-r-full text-slate-600 hover:bg-slate-100"
                              onClick={() => incQty(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {cartProducts.length === 0 ? (
                  <div className="px-5 py-10 text-center text-sm text-slate-500">
                    Keranjang kosong.
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="text-lg font-semibold text-slate-900">
                Ringkasan belanja
              </div>

              <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="text-sm text-slate-600">
                  Total{" "}
                  <span className="text-slate-400">
                    ({selectedCount} dipilih)
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {total > 0 ? formatIDR(total) : "-"}
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">Verifikasi nomor HP</div>
                    <div className="text-xs text-slate-500">
                      biar bisa pake promo!
                    </div>
                  </div>
                  <span className="text-slate-400">›</span>
                </div>
              </button>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={selectedCount === 0}
                onClick={() => alert("Checkout: " + formatIDR(total))}
              >
                Beli
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </main>
  );
}
