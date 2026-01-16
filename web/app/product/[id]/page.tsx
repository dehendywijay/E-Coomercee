"use client"

import { useAuth } from "@/app/context/authcontext";
import { NavbarDefault } from "@/components/header/navbar-form";
import {Product} from "@/types/interface";
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
    const price = (): number => {
      if (!products) return 0;
      if (!products.discountPercentage) return products.originalPrice;
      const priceFinal = products.originalPrice - (products.originalPrice * products.discountPercentage) / 100;
      return priceFinal;
    };
    useEffect(() => {
      const run = async () => {
        await loadBarang();
      };
      run();
    }, [])
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
          

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>Terjaul {products?.salesCount}.</span>
            <span className="text-gray-300">•</span>
            <span>{products?.rating}</span>
          </div>
          
            {products?.discountPercentage !=null 
            ?<div className="mt-3 text-2xl font-semibold text-gray-900"> Rp{price().toLocaleString("id-ID")} 
              <div>
                <span className="mr-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                  {products.discountPercentage}%
                </span>
                <span className="text-sm text-gray-500 line-through">
                  Rp{products?.originalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            : <div className="mt-3 text-2xl font-semibold text-gray-900"> Rp{price().toLocaleString("id-ID")} </div>
            }
          

          <div className="mt-4 flex gap-6 border-b border-gray-100 text-sm">
            <button className="border-b-2 border-emerald-500 pb-2 font-medium text-emerald-600">
              Detail Produk
            </button>
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <div>
              <span className="text-gray-500">Kondisi:</span>{" "}
              <span>{products?.condition}</span>
            </div>
            <div>
              <span className="text-gray-500">Min. Pemesanan:</span>{" "}
              <span>1</span>
            </div>
            <div>
              <span className="text-gray-500">Berat Satuan:</span>{" "}
              <span className="text-emerald-600">{products?.unitWeight}</span>
            </div>
          </div>

          <div className="mt-3 list-disc space-y-1 text-sm">
            <p className="text-md text-black-600">{products?.description}</p>
          </div>
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
                Stok Total: {products?.stock}
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
