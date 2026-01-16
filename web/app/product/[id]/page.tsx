"use client"

import { useAuth } from "@/app/context/authcontext";
import { NavbarDefault } from "@/components/header/navbar-form";
import {Product} from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = React.use(params);
  const [products, setProducts] = useState<Product | null>(null);
  const [token, setToken ] = useState("");

  const loadBarang = async () => {
    try {
      const token = await axios.get("http://localhost:3001/api/auth/refresh", {
        withCredentials: true,
      });
      setToken(token.data.accesToken)

      const response = await axios.get(
        `http://localhost:3001/api/products/details/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setProducts(response.data.data);
      
    } catch (error) {
      console.error("Error ambil data:", error);
      
    }
  }
    useEffect(() => {
      const run = async () => {
        await loadBarang();
      };
  run();
  console.log("s",id);
    },[])
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <NavbarDefault />
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-[1.2fr_1.4fr_0.8fr] gap-6">
        <section className="flex flex-col gap-3">
          <div className="h-72 rounded-lg bg-black" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 flex-1 rounded bg-black" />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
          <h1 className="text-lg font-semibold">{products?.name}</h1>
          <p className="text-sm text-gray-600">{products?.description}</p>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>Stok {products?.stock}.</span>
            <span className="text-gray-300">•</span>
            <span>{products?.rating}</span>
          </div>

          <div className="mt-3 text-2xl font-semibold text-gray-900">
            RP{products?.originalPrice}
          </div>

          <div className="mt-4 flex gap-6 border-b border-gray-100 text-sm">
            <button className="border-b-2 border-emerald-500 pb-2 font-medium text-emerald-600">
              Detail Produk
            </button>
            <button className="pb-2 text-gray-500">Spesifikasi</button>
            <button className="pb-2 text-gray-500">Info Penting</button>
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <div>
              <span className="text-gray-500">Kondisi:</span>{" "}
              <span>{products?.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Min. Pemesanan:</span>{" "}
              <span>1</span>
            </div>
            <div>
              <span className="text-gray-500">Etalase:</span>{" "}
              <span className="text-emerald-600">Kategore</span>
            </div>
          </div>

          {/* <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {products?.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul> */}
        </section>

        <aside className="self-start">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-sm">Atur jumlah dan catatan</p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded border border-gray-300"
              >
                −
              </button>
              <input
                className="h-7 w-12 rounded border border-gray-300 text-center text-sm"
                defaultValue={1}
              />
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded border border-gray-300"
              >
                +
              </button>
              <span className="ml-auto text-xs text-gray-500">
                Stok Total: Sisa 3
              </span>
            </div>

            <div className="mt-3 text-xs text-gray-500">Subtotal</div>
            {/* <div className="text-lg font-semibold">{products.originalPrice}</div> */}

            <div className="mt-3 flex flex-col gap-2">
              <button className="rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-white">
                + Keranjang
              </button>
              <button className="rounded-lg border border-emerald-500 py-2 text-sm font-semibold text-emerald-500">
                Beli Langsung
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
