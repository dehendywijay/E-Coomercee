// app/checkout/page.tsx
import { NavbarDefault } from "@/components/header/navbar-form";


const address: Address = {
  label: "Rumah - Dehendy",
  name: "Dehendy",
  detail:
    "Perumahan Bunga Mustika, Jalan Anyelir Blok D No. 13, RT.16/RW.4, Hajimena, Natar, Kab. Lampung Selatan, Lampung, 6289520218319",
};

const items: CheckoutItem[] = [
  {
    storeName: "Toolsmart",
    productName:
      "KABEL TALI TIS TIES NILON 3mmX150mm KAIYO KAYTO HOUGEN",
    variant: "Hitam",
    qty: 1,
    price: 6500,
    shippingMethod: "JNE (Rp13.000)",
    shippingCost: 13000,
    eta: "Estimasi tiba besok - 13 Jan",
  },
  {
    storeName: "Apotek Duta Farma 2 By GoA",
    productName: "EVALEN GEL ISI 10 GRAM TUBE",
    variant: "Reguler",
    qty: 1,
    price: 62103,
    shippingMethod: "J&T (Rp25.000)",
    shippingCost: 25000,
    eta: "Estimasi tiba 11 - 13 Jan",
  },
];

const paymentMethods = [
  "BCA Virtual Account",
  "Alfamart / Alfamidi / Lawson / Dan+Dan",
  "Mandiri Virtual Account",
  "BRI Virtual Account",
];

// app/checkout/types.ts
export type Address = {
  label: string;
  name: string;
  detail: string;
};

export type CheckoutItem = {
  storeName: string;
  productName: string;
  variant: string;
  qty: number;
  price: number;
  shippingMethod: string;
  shippingCost: number;
  eta: string;
};


export default function CheckoutPage() {
  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty + item.shippingCost,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <NavbarDefault />

      <div className="max-w-6xl mx-auto py-6 flex gap-6">
        {/* KIRI: alamat + pesanan */}
        <section className="flex-1 space-y-4">
          {/* Alamat pengiriman */}
          <div className="bg-white border rounded-lg p-4 space-y-2">
            <h2 className="text-sm font-semibold mb-2">ALAMAT PENGIRIMAN</h2>
            <p className="text-sm">
              <span className="font-semibold">{address.label}</span>
            </p>
            <p className="text-xs text-gray-600">{address.detail}</p>

            <button
              type="button"
              className="mt-2 px-3 py-1 text-xs border rounded-lg text-green-600"
            >
              Ganti
            </button>
          </div>

          {/* Pesanan per toko */}
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 space-y-3"
            >
              <p className="text-xs font-semibold mb-1">
                PESANAN {index + 1}
              </p>
              <p className="text-sm font-semibold mb-2">{item.storeName}</p>

              <div className="flex items-start gap-3">
                {/* Placeholder gambar */}
                <div className="w-16 h-16 bg-gray-200 rounded" />

                <div className="flex-1 space-y-1">
                  <p className="text-sm">{item.productName}</p>
                  <p className="text-xs text-gray-500">{item.variant}</p>
                  <p className="text-xs">
                    {item.qty} x Rp
                    {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  Rp{(item.price * item.qty).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Pengiriman */}
              <div className="border rounded-lg p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Reguler</span>
                  <span>{item.shippingMethod}</span>
                </div>
                <p className="text-gray-600">{item.eta}</p>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Pakai Asuransi Pengiriman</span>
                </label>
              </div>

              {/* Catatan */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>📝</span>
                <button type="button">Kasih Catatan</button>
              </div>
            </div>
          ))}
        </section>

        {/* KANAN: metode pembayaran & total */}
        <aside className="w-80 bg-white border rounded-lg p-4 space-y-4">
          <h2 className="text-sm font-semibold mb-2">Metode Pembayaran</h2>

          <div className="space-y-2">
            {paymentMethods.map((method, idx) => (
              <label
                key={method}
                className="flex items-center gap-2 text-xs"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  defaultChecked={idx === 0}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            className="w-full mt-2 px-3 py-2 text-xs border rounded-lg text-left flex items-center justify-between"
          >
            <span>Pakai promo biar makin hemat!</span>
            <span>&gt;</span>
          </button>

          <div className="border-t pt-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Total Tagihan</span>
              <span>Rp{itemsSubtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg text-sm"
          >
            Bayar Sekarang
          </button>

          <p className="text-[10px] text-gray-500 mt-2">
            Dengan melanjutkan pembayaran, kamu menyetujui S&K serta
            Asuransi Pengiriman & Proteksi.
          </p>
        </aside>
      </div>
    </main>
  );
}
