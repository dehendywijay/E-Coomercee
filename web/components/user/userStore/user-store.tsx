import { useAuth } from "@/app/context/authcontext";
import { Row } from "../user-form";

export function StoreSection() {
   const { user } = useAuth();

  const hasStore = !!user?.store; 

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold mb-3">Toko Saya</h2>

      {hasStore ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <Row label="Nama Toko" value={user?.store?.name ?? "-"} />
              <Row label="Lokasi" value="-" />
              <Row label="Deskripsi" value="-" />
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Total Produk" value="0" />
              <Row label="Rating" value="-" />
            </div>
          </div>

          <button className="mt-4 w-full md:w-48 text-sm border rounded-md py-2 text-green-600">
            Kelola Toko
          </button>
        </>
      ) : (
        <button className="mt-4 w-full md:w-48 text-sm border rounded-md py-2 text-green-600">
          Buka Toko
        </button>
      )}
    </div>
  );
}