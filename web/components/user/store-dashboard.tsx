import { useAuth } from "@/app/context/authcontext";
import { NavbarDefault } from "./navbar-form";
import { useRouter } from "next/navigation";


type Product = {
  name            : string
  imageSrc        : string
  stock         : number
  originalPrice    : number
  discountPercentage? : number
  rating            : number
  salesCount        : string
  bonusText         : string
  location     :    string
  description : string
};

export function StoreDashboard() {
    
  const { user } = useAuth();
  const store = user?.store;
  const products: Product[] = user?.products ?? [];
  const router = useRouter();

  if (!store) {
    return (
      <div className="flex flex-col gap-4 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-semibold mb-3">Toko Saya</h2>
        <p className="text-sm text-gray-600">
          Kamu belum memiliki toko. Silakan buka toko terlebih dahulu.
        </p>
        <button className="mt-2 w-full md:w-48 text-sm border rounded-md py-2 text-green-600">
          Buka Toko
        </button>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    
    <main className="min-h-screen bg-gray-100">
      <NavbarDefault/>
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Dashboard Toko</h2>
          <p className="text-sm text-gray-500">{store.name}</p>
        </div>

        <button className="text-sm border rounded-md px-4 py-2 text-green-600">
          Kelola Toko
        </button>
      </div>

      {/* Kartu ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Total Produk</p>
          <p className="text-2xl font-semibold mt-1">{totalProducts}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Total Stok</p>
          <p className="text-2xl font-semibold mt-1">{totalStock}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Rating</p>
          <p className="text-2xl font-semibold mt-1">
            {products[0]?.rating ?? "-"}
          </p>
        </div>
      </div>

      {/* Tabel produk */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">Daftar Produk</h3>
          <button className="text-xs border rounded-md px-3 py-1 text-green-600" onClick={() => router.push('/store/product')}>
            Tambah Produk
            
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada produk. Tambahkan produk pertama kamu.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-2">Nama</th>
                  <th className="text-left py-2 px-2">Harga</th>
                  <th className="text-left py-2 px-2">Stok</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.name} className="border-b last:border-0">
                    <td className="py-2 px-2">{p.name}</td>
                    <td className="py-2 px-2">
                    {p.originalPrice != null
                        ? `Rp ${p.originalPrice.toLocaleString("id-ID")}`
                        : "-"}
                    </td>
                    <td className="py-2 px-2">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}
