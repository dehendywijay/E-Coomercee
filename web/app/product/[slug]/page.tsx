import { NavbarDefault } from "@/components/header/navbar-form";

type Product = {
  name: string;
  subtitle: string;
  price: string;
  soldInfo: string;
  ratingInfo: string;
  condition: string;
  minOrder: string;
  category: string;
  specs: string[];
};

const product: Product = {
  name: "Leadtek NVIDA QUADRO RTX 6000 ADA Generation",
  subtitle: "48GB GDDR6",
  price: "Rp214.449.000",
  soldInfo: "Terjual 3",
  ratingInfo: "5 (1 rating)",
  condition: "Baru",
  minOrder: "1 Buah",
  category: "Graphic Card GPU",
  specs: [
    "NVIDIA RTX 6000 Ada Generation",
    "Ada Lovelace GPU architecture",
    "18,176 CUDA Cores",
    "568 Tensor Cores",
    "142 RT Cores",
    "48GB GDDR6 Memory with ECC",
    "Memory Bandwidth: 960 GB/s"
  ]
};

export default async function ProductPage() {
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
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.subtitle}</p>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>{product.soldInfo}</span>
            <span className="text-gray-300">•</span>
            <span>{product.ratingInfo}</span>
          </div>

          <div className="mt-3 text-2xl font-semibold text-gray-900">
            {product.price}
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
              <span>{product.condition}</span>
            </div>
            <div>
              <span className="text-gray-500">Min. Pemesanan:</span>{" "}
              <span>{product.minOrder}</span>
            </div>
            <div>
              <span className="text-gray-500">Etalase:</span>{" "}
              <span className="text-emerald-600">{product.category}</span>
            </div>
          </div>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
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
            <div className="text-lg font-semibold">{product.price}</div>

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
