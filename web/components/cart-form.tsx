// app/components/CartItem.tsx
import { NavbarDefault } from "./navbar-form";

type CartItemProps = {
  storeName: string;
  productName: string;
  variant: string;
  price: number;
  quantity: number;
};

const item1: CartItemProps = {
  storeName: "Toolsmart",
  productName: "KABEL TALI TIS TIES NILON 3mmX150mm KAIYO KAYTO HOUGEN",
  variant: "Hitam",
  price: 6500,
  quantity: 1,
};

export function CartItem() {
  const { storeName, productName, variant, price, quantity } = item1;

  return (
    <main className="min-h-screen bg-gray-50">
      <NavbarDefault />

      <div className="max-w-5xl mx-auto py-6">
        <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white mb-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="select-all" />
            <label htmlFor="select-all" className="text-sm font-medium">
              Pilih Semua (1)
            </label>
          </div>
          <button
            type="button"
            className="text-xs text-red-500"
          >
            Hapus
          </button>
        </div>

        <section className="border rounded-lg p-4 flex flex-col gap-3 bg-white">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="font-medium text-sm">{storeName}</span>
          </div>

          <div className="flex items-start gap-3 pl-6">
            <input type="checkbox" className="mt-2" />

            <div className="w-16 h-16 bg-gray-200 rounded" />

            <div className="flex-1">
              <p className="text-sm">{productName}</p>
              <p className="text-xs text-gray-500 mt-1">{variant}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-sm font-semibold">
                Rp{price.toLocaleString("id-ID")}
              </p>

              <div className="flex items-center border rounded">
                <button type="button" className="px-2 text-sm">
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  defaultValue={quantity}
                  className="w-10 text-center text-sm border-x outline-none"
                />
                <button type="button" className="px-2 text-sm">
                  +
                </button>
              </div>

              <button type="button" className="text-xs text-red-500">
                Hapus
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
