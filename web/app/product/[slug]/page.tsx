// app/produk/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";

type PageProps = {
  params: { id: string };
};

async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

function formatPrice(price: number) {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return notFound();
  }

  const hasDiscount = typeof product.discountPercentage === "number";
  const finalPrice = hasDiscount
    ? product.originalPrice * (1 - (product.discountPercentage ?? 0) / 100)
    : product.originalPrice;

  return (
    <main className="mx-auto max-w-6xl grid gap-8 py-8 md:grid-cols-[1.2fr_1fr]">
      {/* Kiri: gambar + deskripsi */}
      <section className="space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="space-y-2 rounded-lg border p-4 text-sm text-neutral-800">
          <h2 className="text-base font-semibold">Deskripsi Produk</h2>
          <p className="whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>
      </section>

      {/* Kanan: detail + beli */}
      <section className="space-y-4">
        {/* Judul + rating + lokasi */}
        <header className="space-y-2">
          <h1 className="text-xl font-semibold leading-snug">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span>Terjual {product.salesCount}</span>
            <span>•</span>
            <span>{product.rating.toFixed(1)} / 5</span>
            <span>•</span>
            <span>{product.location}</span>
          </div>
        </header>

        {/* Harga + diskon */}
        <div className="space-y-1">
          <p className="text-2xl font-bold text-emerald-600">
            {formatPrice(finalPrice)}
          </p>

          {hasDiscount && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Info stok + bonus */}
        <div className="space-y-1 text-sm text-neutral-700">
          <p>Kondisi: Baru</p>
          <p>Stok: {product.stock}</p>
          <p className="text-emerald-600 font-medium">{product.bonusText}</p>
        </div>

        {/* Form beli */}
        <form className="space-y-3">
          <div className="flex items-center gap-2">
            <label htmlFor="qty" className="text-sm">
              Jumlah
            </label>
            <input
              id="qty"
              name="qty"
              type="number"
              min={1}
              max={product.stock}
              defaultValue={1}
              className="w-20 rounded border px-2 py-1 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              + Keranjang
            </button>
            <button
              type="button"
              className="flex-1 rounded border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              Beli Langsung
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
