"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export type Product = {
  id: number
  title: string
  price: number
  sold: string
  rating: number
  image: string
  badge?: string
  discount?: number
}

export const products: Product[] = [
  {
    id: 1,
    title: "Philips Digital Rice Cooker",
    price: 666400,
    sold: "4rb+ terjual",
    rating: 4.9,
    image: "/images/ricecooker.jpg",
    badge: "17%",
    discount: 17,
  },
  {
    id: 2,
    title: "[FOR GIFT] Laneige Waterbank",
    price: 999999,
    sold: "1rb+ terjual",
    rating: 5.0,
    image: "/images/laneige.jpg",
    badge: "52%",
    discount: 52,
  },
]


type Props = {
  product: Product
}


export function ProductCard({ product }: Props) {
  return (
    <Card className="relative flex h-full max-w-[300px] flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {product.badge && (
        <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          {product.badge}
        </div>
      )}
      <div className="relative h-40 w-full bg-[#f5f5f5]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-1 p-2 text-xs">
        <p className="line-clamp-2 min-h-[32px] font-medium">
          {product.title}
        </p>

        <p className="text-base font-bold text-[#ff5722]">
          Rp{product.price.toLocaleString("id-ID")}
        </p>

        <div className="flex items-center gap-1 text-[11px] text-gray-600">
          <span>⭐ {product.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span>{product.sold}</span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-[10px] text-green-600">
          <span className="inline-flex rounded-sm bg-green-50 px-1 py-[1px]">
            Official Store
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
