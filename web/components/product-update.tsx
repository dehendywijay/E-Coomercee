"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { NavbarDefault } from "./navbar-form";
import { toast } from "sonner";
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
         res = await axios.post("http://localhost:3001/api/store/product", form, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await axios.put(
          `http://localhost:3001/api/store/product/${form.id}`,
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

  return (
    <main className="min-h-screen bg-gray-100">
          <NavbarDefault/>
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-3xl mx-auto px-4 md:px-6 lg:px-8"
    >
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "Tambah Produk" : "Edit Produk"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Nama Produk</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Gambar (URL)</label>
          <Input
            name="imageSrc"
            value={form.imageSrc}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Harga</label>
          <Input
            type="number"
            name="originalPrice"
            value={form.originalPrice}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Stok</label>
          <Input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Diskon (%)</label>
          <Input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
            min={0}
            max={100}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Rating</label>
          <Input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min={0}
            max={5}
            step={0.1}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Terjual</label>
          <Input
            name="salesCount"
            value={form.salesCount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Lokasi</label>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Bonus / Label</label>
        <Input
          name="bonusText"
          value={form.bonusText}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Deskripsi</label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading
          ? "Menyimpan..."
          : mode === "create"
          ? "Tambah Produk"
          : "Simpan Perubahan"}
      </Button>
    </form>
    </main>
  );
}
