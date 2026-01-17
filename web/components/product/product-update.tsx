"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { NavbarDefault } from "@/components/header/navbar-form";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Image,
  Package,
  Tag,
  Star,
  MapPin,
  Gift,
  TrendingUp,
  Save,
  Loader2,
} from "lucide-react";

type ProductFormValues = {
  id?: string; 
  name: string;
  imageSrc: string;
  stock: number;
  originalPrice: number;
  discountPercentage?: number;
  rating: number;
  salesCount: string;
  bonusText: string;
  location: string;
  description: string;
};

type ProductFormProps = {
  mode: "create" | "edit";
  initialProduct?: ProductFormValues;
  onSuccess?: () => void;
};

export function ProductForm({ mode, initialProduct, onSuccess }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>({
    id: initialProduct?.id,
    name: initialProduct?.name ?? "",
    imageSrc: initialProduct?.imageSrc ?? "",
    stock: initialProduct?.stock ?? 0,
    originalPrice: initialProduct?.originalPrice ?? 0,
    discountPercentage: initialProduct?.discountPercentage ?? 0,
    rating: initialProduct?.rating ?? 0,
    salesCount: initialProduct?.salesCount ?? "",
    bonusText: initialProduct?.bonusText ?? "",
    location: initialProduct?.location ?? "",
    description: initialProduct?.description ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [imagePreview, setImagePreview] = useState(form.imageSrc);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "stock" ||
        name === "originalPrice" ||
        name === "discountPercentage" ||
        name === "rating"
          ? Number(value || 0)
          : value,
    }));
    if (name === "imageSrc") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let res;
    try {
      const respone = await axios.get("http://localhost:3001/api/auth/refresh", {
        withCredentials: true,
      });
      const accessToken = respone.data.accesToken
      setToken(accessToken);
      if (mode === "create") {
         res = await axios.post("http://localhost:3001/api/store/products", form, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await axios.put(
          `http://localhost:3001/api/store/products/${form.id}`,
          form,
          { withCredentials: true }
        );
      }

      onSuccess?.();
      if (res){
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error("submit product error:", err);
       toast.success("Produk gagal disimpan");
    } finally {
      setLoading(false);
    }
  };

  const discountPrice = form.originalPrice * (1 - (form.discountPercentage || 0) / 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/70 to-white">
      <NavbarDefault />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 p-0">
            <div className="px-8 py-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-3xl font-black text-white">
                  {mode === "create" ? "📦 Tambah Produk Baru" : "✏️ Edit Produk"}
                </CardTitle>
              </div>
              <p className="text-emerald-100 font-medium">
                Isi informasi produk dengan lengkap untuk hasil optimal
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Nama Produk */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">1</span>
                      Nama Produk
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                      placeholder="Masukkan nama produk (max 100 karakter)"
                      required
                    />
                  </div>

                  {/* Harga & Diskon */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-lg">2</span>
                        Harga
                      </label>
                      <Input
                        type="number"
                        name="originalPrice"
                        value={form.originalPrice}
                        onChange={handleChange}
                        className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                        placeholder="0"
                        min={0}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-lg">3</span>
                        Diskon %
                      </label>
                      <Input
                        type="number"
                        name="discountPercentage"
                        value={form.discountPercentage}
                        onChange={handleChange}
                        className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                        placeholder="0"
                        min={0}
                        max={100}
                      />
                    </div>
                  </div>
                  {form.discountPercentage && form.discountPercentage > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-2xl border-2 border-emerald-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">Harga Diskon:</span>
                        <Badge className="text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 shadow-lg">
                          Rp{discountPrice.toLocaleString("id-ID")}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-600 to-green-600 h-2 rounded-full shadow-lg transition-all duration-500" 
                          style={{ width: `${form.discountPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stok */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">4</span>
                      Stok
                    </label>
                    <Input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                      placeholder="0"
                      min={0}
                      required
                    />
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">5</span>
                      Lokasi Pengiriman
                    </label>
                    <Input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                      placeholder="Kota, Provinsi"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Preview Gambar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">6</span>
                      Gambar Produk
                    </label>
                    <div className="space-y-3">
                      <Input
                        name="imageSrc"
                        value={form.imageSrc}
                        onChange={handleChange}
                        className="h-12 text-base border-2 border-dashed border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-400 transition-all duration-200"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div className="relative group">
                        <div className={`w-full h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-dashed border-gray-200 group-hover:border-emerald-300 transition-all duration-300 ${
                          imagePreview ? 'bg-gradient-to-br from-gray-50 to-white' : 'bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center'
                        }`}>
                          {imagePreview ? (
                            <img 
                              src={imagePreview} 
                              alt="Preview"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-center space-y-2 p-8">
                              <Image className="w-16 h-16 mx-auto text-emerald-400" />
                              <p className="text-lg font-semibold text-emerald-700">Gambar akan muncul di sini</p>
                              <p className="text-sm text-gray-600">Masukkan URL gambar produk</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bonus Text */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">7</span>
                      Label Bonus
                    </label>
                    <Input
                      name="bonusText"
                      value={form.bonusText}
                      onChange={handleChange}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                      placeholder="Gratis Ongkir, Cicilan 0%, dll"
                    />
                  </div>

                  {/* Rating & Sales */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        Rating Awal
                      </label>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`p-2 rounded-lg transition-all ${
                              i < form.rating
                                ? "bg-yellow-400 text-white shadow-md"
                                : "bg-gray-200 text-gray-500 hover:bg-yellow-300 hover:text-white hover:shadow-md"
                            }`}
                            onClick={() => setForm(prev => ({ ...prev, rating: i + 1 }))}
                          >
                            <Star className="h-6 w-6" fill={i < form.rating ? "currentColor" : "none"} />
                          </button>
                        ))}
                        <span className="ml-3 text-lg font-bold text-emerald-700">
                          {form.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Terjual</label>
                      <Input
                        name="salesCount"
                        value={form.salesCount}
                        onChange={handleChange}
                        className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all duration-200"
                        placeholder="1.2K Terjual"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-lg">8</span>
                  Deskripsi Produk
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="h-40 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm hover:border-emerald-300 transition-all resize-none"
                  placeholder="Tulis deskripsi lengkap produk kamu..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-2xl hover:shadow-3xl text-xl font-black rounded-2xl border-4 border-emerald-400/30 transition-all duration-300 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                      {mode === "create" ? "Menyimpan Produk..." : "Menyimpan..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                      {mode === "create" ? "🚀 Tambah Produk Baru" : "💾 Simpan Perubahan"}
                    </>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="h-16 px-8 border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={onSuccess}
                >
                  ← Kembali
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
