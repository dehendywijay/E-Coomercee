// product-card-home.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/type"

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="relative flex h-full max-w-[300px] flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {product.name && (
        <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          {product.name}
        </div>
      )}

      <div className="relative h-40 w-full bg-[#f5f5f5]">
        {/* <Image
          src={product.imageSrc || "/placeholder.png"}
          alt={product.name || "Produk"}
          fill
          className="object-contain"
        /> */}
      </div>

      <CardContent className="flex flex-1 flex-col gap-1 p-2 text-xs">
        <p className="line-clamp-2 min-h-[32px] font-medium">
          {product.name}
        </p>

        <p className="text-base font-bold text-[#ff5722]">
          {product.originalPrice != null
            ? `Rp${product.originalPrice.toLocaleString("id-ID")}`
            : "Rp-"}
        </p>

        <div className="flex items-center gap-1 text-[11px] text-gray-600">
          <span>⭐ {product.rating ?? "-"}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span>{product.salesCount ?? "-"}</span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-[10px] text-green-600">
          <span className="inline-flex rounded-sm bg-green-50 px-1 py-[1px]">
            Official Store
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
