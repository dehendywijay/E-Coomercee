import { Badge } from "@/components/ui/badge"; // Asumsikan Anda telah menginstal Shadcn Badge
import { Star } from "lucide-react"; // Asumsikan Anda telah menginstal lucide-react

// --- 1. INTERFACE PRODUK ---
/**
 * Definisi tipe data untuk satu item produk.
 */
interface Product {
  id: string;
  discountPercentage?: number;
  imageSrc: string;
  name: string;
  currentPrice: number;
  originalPrice?: number;
  rating: number;
  salesCount: string;
  storeName: string;
  location: string;
  isOfficialStore: boolean;
  bonusText?: string;
}

// --- 2. MOCK DATA PRODUK ---
/**
 * Data tiruan untuk mengisi daftar produk.
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p001",
    discountPercentage: 54,
    imageSrc: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Sepatu+Kulit",
    name: "PAULMAY - Sepatu Pria Kulit Asli Formal Casual Slip On Hitam",
    currentPrice: 214449,
    originalPrice: 466193,
    rating: 4.9,
    salesCount: "2rb+",
    storeName: "Paulmay",
    location: "Kab. Tangerang",
    isOfficialStore: true,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
  {
    id: "p002",
    discountPercentage: 51,
    imageSrc: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Keyboard+Gaming",
    name: "[OFFICIAL] AULA F75 Mechanical Keyboard 80 Keys Gasket Mount Hot Swappable",
    currentPrice: 739000,
    originalPrice: 1508163,
    rating: 4.9,
    salesCount: "6rb+",
    storeName: "Aula Official Store",
    location: "Jakarta",
    isOfficialStore: true,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
  {
    id: "p003",
    discountPercentage: 38,
    imageSrc: "https://via.placeholder.com/150/00FF00/000000?text=iPhone+15",
    name: "Apple iPhone 15 512GB Garansi Resmi iBox Indonesia - Blue",
    currentPrice: 13724000,
    originalPrice: 22135483,
    rating: 4.9,
    salesCount: "1rb+",
    storeName: "Digitech Mall",
    location: "Kota Bandung",
    isOfficialStore: false,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
  {
    id: "p004",
    discountPercentage: 5,
    imageSrc: "https://via.placeholder.com/150/FFFF00/000000?text=Xiaomi+Pad+2",
    name: "Xiaomi Redmi Pad 2 6GB/128GB Garansi Resmi 1 Tahun BNIB",
    currentPrice: 1999000,
    originalPrice: 2104210,
    rating: 4.9,
    salesCount: "10rb+",
    storeName: "Xiaomi Indonesia",
    location: "Jakarta Pusat",
    isOfficialStore: true,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
  {
    id: "p005",
    discountPercentage: 31,
    imageSrc: "https://via.placeholder.com/150/00FFFF/000000?text=Cetaphil",
    name: "Cetaphil Gentle Skin Cleanser 500ml - Sabun Pembersih Wajah",
    currentPrice: 299900,
    originalPrice: 434637,
    rating: 5.0,
    salesCount: "10rb+",
    storeName: "Cetaphil Official Store",
    location: "Jakarta Selatan",
    isOfficialStore: true,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
  {
    id: "p006",
    discountPercentage: 77,
    imageSrc: "https://via.placeholder.com/150/FF00FF/000000?text=Charger+Anker",
    name: "Anker Zolo GaN 20W Charger Fast Charging PowerIQ 3.0",
    currentPrice: 117000,
    originalPrice: 508695,
    rating: 5.0,
    salesCount: "10rb+",
    storeName: "Anker Indonesia",
    location: "Jakarta Utara",
    isOfficialStore: false,
    bonusText: "Hemat s.d 15% Pakai Bonus",
  },
];

// --- 3. KOMPONEN KARTU PRODUK TUNGGAL ---

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Fungsi untuk memformat harga ke Rupiah
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.currentPrice);

  return (
    <div className="relative border p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Label Diskon (Shadcn Badge) */}
      {product.discountPercentage && (
        <Badge
          variant="default"
          className="absolute top-0 left-0 m-2 rounded-sm bg-red-500 text-white z-10 text-xs py-1 px-2"
        >
          {product.discountPercentage}%
        </Badge>
      )}

      {/* Gambar Produk */}
      <img
        src={product.imageSrc}
        alt={product.name}
        // Pastikan rasio gambar konsisten
        className="w-full h-40 object-contain rounded-md mb-2"
      />

      {/* Detail Produk */}
      <div className="space-y-1">
        {/* Nama Produk - gunakan line-clamp untuk membatasi tinggi */}
        <p className="text-sm font-medium line-clamp-2 h-10">{product.name}</p>

        {/* Harga Baru */}
        <p className="text-base font-bold text-red-600 pt-1">{formattedPrice}</p>

        {/* Harga Lama (Dicoret) */}
        {product.originalPrice && (
          <p className="text-xs text-gray-500 line-through">
            Rp{product.originalPrice.toLocaleString("id-ID")}
          </p>
        )}

        {/* Bonus Text (Shadcn Badge dengan style kustom) */}
        {product.bonusText && (
          <Badge
            variant="outline"
            className="text-[10px] font-normal border-green-500 text-green-700 bg-green-50 py-0.5 px-1.5"
          >
            {product.bonusText}
          </Badge>
        )}

        {/* Rating dan Terjual */}
        <div className="flex items-center text-xs text-gray-600 pt-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="mx-1">·</span>
          <span>{product.salesCount} terjual</span>
        </div>

        {/* Nama Toko dan Lokasi */}
        <div className="flex items-center text-xs text-gray-400">
          {/* Di sini bisa ditambahkan ikon official store, misal: */}
          {/* {product.isOfficialStore && <CheckCircle className="w-3 h-3 text-blue-500 mr-1" />} */}
          <p>
            {product.storeName} {product.location ? `| ${product.location}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 4. KOMPONEN UTAMA (DAFTAR PRODUK) ---

/**
 * Komponen utama yang menampilkan semua produk dalam grid responsif.
 */
export function ProductListing() {
  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">✨ Daftar Produk Terbaru</h2>

      {/* Tailwind Grid untuk tata letak responsif */}
      <div
        className="grid grid-cols-2 gap-4 
                    sm:grid-cols-3 
                    md:grid-cols-4 
                    lg:grid-cols-5 
                    xl:grid-cols-6"
      >
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

