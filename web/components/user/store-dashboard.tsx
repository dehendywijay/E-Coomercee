"use client";

import { NavbarDefault } from "@/components/header/navbar-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authcontext";
import {
  Package,
  ShoppingBag,
  Users,
  Star,
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  MapPin,
} from "lucide-react";

export function StoreDashboard() {
  const { user } = useAuth();
  const store = user?.store;
  const products = user?.products ?? [];
  const router = useRouter();

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
        <NavbarDefault />
        <div className="flex flex-col gap-6 max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Mulai Jualan Sekarang!</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Kamu belum memiliki toko. Buat toko pertamamu dan mulai jualan dengan mudah.
          </p>
          <Button 
            size="lg" 
            className="w-full md:w-80 h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            🚀 Buka Toko Saya
          </Button>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum: number, p: any) => sum + (p.stock || 0), 0);
  const avgRating = products.length > 0 
    ? (products.reduce((sum: number, p: any) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-white">
      <NavbarDefault />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 gap-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
                    Dashboard Toko
                  </h1>
                  <p className="text-xl font-semibold text-gray-900">{store.name}</p>
                  <div className="flex items-center gap-4 text-sm text-emerald-700 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {store.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-xl hover:shadow-2xl h-14 px-8 font-bold text-lg whitespace-nowrap"
            >
              ⚙️ Kelola Toko
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100 shadow-lg hover:shadow-2xl transition-all group border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Produk</p>
                  <p className="text-3xl font-black text-emerald-700">{totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-lg hover:shadow-2xl transition-all group border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Stok</p>
                  <p className="text-3xl font-black text-blue-700">{totalStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 shadow-lg hover:shadow-2xl transition-all group border-0 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Rating Rata-rata</p>
                  <p className="text-3xl font-black text-yellow-700">{avgRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-lg hover:shadow-2xl transition-all group border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Penjualan Bulan Ini</p>
                  <p className="text-3xl font-black text-green-700">Rp 2.4M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="shadow-2xl border-emerald-100 border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 p-0">
            <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                📦 Daftar Produk ({totalProducts})
              </CardTitle>
              <Button 
                onClick={() => router.push('/store/product')}
                className="bg-white hover:bg-gray-50 text-emerald-700 font-bold shadow-lg hover:shadow-xl h-12 px-6 whitespace-nowrap border border-white/50"
              >
                <Plus className="h-5 w-5 mr-2" />
                Tambah Produk Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {products.length === 0 ? (
              <div className="text-center py-20 px-8">
                <ShoppingBag className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Produk</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Mulai tambahkan produk pertama kamu untuk memulai berjualan
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-xl h-14 px-12 font-bold"
                >
                  🚀 Tambah Produk Pertama
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-emerald-50 to-green-50/50">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 text-sm uppercase tracking-wide">Produk</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 text-sm uppercase tracking-wide">Harga</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 text-sm uppercase tracking-wide">Stok</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 text-sm uppercase tracking-wide">Rating</th>
                      <th className="w-32 py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p: any, index: number) => (
                      <tr key={index} className="hover:bg-emerald-50/50 transition-colors group">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                              <img 
                                src={p.imageSrc || "/api/placeholder/80/80"} 
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 leading-tight">
                                {p.name || "Nama Produk"}
                              </p>
                              <p className="text-xs text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block w-fit font-medium">
                                {p.location || "Lokasi"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="space-y-1">
                            <p className="font-bold text-emerald-700 text-lg">
                              Rp{(p.originalPrice || 0).toLocaleString("id-ID")}
                            </p>
                            {p.discountPercentage && (
                              <Badge className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                                -{p.discountPercentage}% Off
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <Badge 
                            className={`text-xs font-bold px-3 py-1 ${
                              (p.stock || 0) > 10 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : (p.stock || 0) > 0 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {(p.stock || 0) > 0 ? `${p.stock} pcs` : "Habis"}
                          </Badge>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (p.rating || 0) 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-1 font-semibold text-sm text-gray-900">
                              {(p.rating || 0).toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 hover:bg-emerald-100 hover:text-emerald-700 p-0 shadow-sm group-hover:bg-emerald-200 transition-all"
                              title="Edit Produk"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 hover:bg-red-100 hover:text-red-700 p-0 shadow-sm group-hover:bg-red-200 transition-all"
                              title="Hapus Produk"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
