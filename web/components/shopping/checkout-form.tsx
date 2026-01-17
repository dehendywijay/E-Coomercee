"use client";

import { NavbarDefault } from "@/components/header/navbar-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  MapPin,
  Truck,
  Package,
  CreditCard,
  Gift,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

// Types lokal
type Address = {
  label: string;
  name: string;
  detail: string;
};

type CheckoutItem = {
  storeName: string;
  productName: string;
  variant: string;
  qty: number;
  price: number;
  shippingMethod: string;
  shippingCost: number;
  eta: string;
};

const address: Address = {
  label: "Rumah - Teknokrat",
  name: "Resky",
  detail:
    "Jalan Anyelir Blok D No. 13, RT.16/RW.4, Natar, Natar, Kab. Lampung Selatan, Lampung, 628312434211",
};

const items: CheckoutItem[] = [
  {
    storeName: "Toolsmart",
    productName: "KABEL TALI TIS TIES NILON 3mmX150mm KAIYO",
    variant: "Hitam - 3mm x 150mm",
    qty: 1,
    price: 6500,
    shippingMethod: "JNE Reguler (Rp13.000)",
    shippingCost: 13000,
    eta: "Estimasi tiba besok - 13 Jan",
  },
  {
    storeName: "Apotek Duta Farma 2 By GoA",
    productName: "EVALEN GEL ISI 10 GRAM TUBE",
    variant: "Reguler",
    qty: 1,
    price: 62103,
    shippingMethod: "J&T Ekspres (Rp25.000)",
    shippingCost: 25000,
    eta: "Estimasi tiba 11 - 13 Jan",
  },
];

const paymentMethods = [
  { id: "bca", label: "BCA Virtual Account", icon: "🏦" },
  { id: "alfamart", label: "Alfamart / Alfamidi / Lawson", icon: "🛒" },
  { id: "mandiri", label: "Mandiri Virtual Account", icon: "🏦" },
  { id: "bri", label: "BRI Virtual Account", icon: "🏦" },
];

const LocalCheckbox = ({ id, checked, onCheckedChange }: { 
  id: string; 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void; 
}) => (
  <button
    type="button"
    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 shadow-sm ${
      checked
        ? "bg-emerald-600 border-emerald-600"
        : "bg-white border-gray-300 hover:border-emerald-400"
    }`}
    onClick={() => onCheckedChange(!checked)}
  >
    {checked && (
      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )}
  </button>
);

export default function CheckoutPage() {
  const [insurance, setInsurance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bca");

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty + item.shippingCost,
    0
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-gray-50/50">
      <NavbarDefault />

      <div className="max-w-7xl mx-auto py-8 px-4 gap-8 lg:flex lg:items-start">
        <section className="lg:flex-1 space-y-6 lg:max-w-4xl">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-emerald-100">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <h2 className="text-lg font-bold text-gray-900">ALAMAT PENGIRIMAN</h2>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block w-fit">
                    {address.label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{address.detail}</p>
                </div>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-10 px-4 shadow-sm">
                  Ganti Alamat
                </Button>
              </div>
            </CardContent>
          </Card>

          {items.map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-emerald-100">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    PESANAN {index + 1}
                  </h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                    {item.storeName}
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-xl">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-md">
                    <ShoppingCart className="h-8 w-8 text-emerald-600" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-gray-900 leading-tight line-clamp-2">{item.productName}</h4>
                    <p className="text-sm text-emerald-700 font-medium">{item.variant}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="px-2 py-1 bg-white text-xs font-semibold text-gray-900 rounded">
                        {item.qty}x
                      </span>
                      <span className="font-bold text-emerald-700">
                        Rp{item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <p className="font-bold text-xl text-emerald-700">
                      Rp{(item.price * item.qty).toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500">+ Ongkir</p>
                  </div>
                </div>

                <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
                  <CardContent className="p-4 pt-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-emerald-800 flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Pengiriman
                        </span>
                        <span className="font-medium">{item.shippingMethod}</span>
                      </div>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        📅 {item.eta}
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <LocalCheckbox 
                          id={`insurance-${index}`} 
                          checked={insurance} 
                          onCheckedChange={setInsurance} 
                        />
                        <label className="text-sm text-gray-700 cursor-pointer select-none">
                          Tambah Asuransi (+Rp5.000)
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-12 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 p-0 font-medium border-dashed border-b border-gray-200"
                >
                  <span className="mr-3 text-emerald-500">📝</span>
                  Tambah Catatan untuk Penjual
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <aside className="lg:w-80 lg:flex-shrink-0 space-y-6">
          <Card className="shadow-xl border-emerald-100 sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Pilih Metode Pembayaran
                </h3>
                
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id} 
                      className={`flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all group hover:shadow-sm ${
                        paymentMethod === method.id
                          ? "border-emerald-400 bg-emerald-50 shadow-md ring-2 ring-emerald-200/50"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === method.id
                          ? "bg-emerald-600 border-emerald-600"
                          : "bg-white border-gray-300 group-hover:border-emerald-400"
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-lg">{method.icon}</span>
                        <span className="text-sm font-semibold text-gray-900">{method.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 border-2 border-dashed border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 justify-start text-sm font-semibold shadow-sm"
              >
                <Gift className="h-4 w-4 mr-2" />
                Pakai Kupon / Promo <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>

              <div className="space-y-3 p-4 bg-emerald-50/50 rounded-2xl border-2 border-emerald-100/50 shadow-inner">
                <div className="flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Belanja + Ongkir</span>
                  <span className="text-2xl font-black text-emerald-700 tracking-tight">
                    Rp{itemsSubtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Button className="w-full h-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 text-xl font-black shadow-2xl hover:shadow-3xl transition-all duration-300 text-white rounded-2xl border-4 border-emerald-400/30 group">
                <span className="group-hover:scale-110 transition-transform">🛒 BAYAR SEKARANG</span>
              </Button>

              <p className="text-xs text-gray-600 leading-relaxed text-center px-2">
                Dengan klik tombol di atas, kamu menyetujui{" "}
                <span className="text-emerald-600 font-semibold hover:underline cursor-pointer transition-colors">Syarat & Ketentuan</span>,{" "}
                <span className="text-emerald-600 font-semibold hover:underline cursor-pointer transition-colors">Asuransi Pengiriman</span>, dan{" "}
                <span className="text-emerald-600 font-semibold hover:underline cursor-pointer transition-colors">Perlindungan Pembeli</span>.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
