import { useAuth } from "@/app/context/authcontext";
import { Row } from "../user-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";

export function StoreSection() {
  const router = useRouter();
   const { user } = useAuth();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const hasStore = !!user?.store; 
  const {token} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:3001/api/store/account",
      {
        name,
        location,
        buka: "YA",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (res.data.status === true) {
      toast.success(res.data.message);
    } else {
      toast.success(res.data.message);
    }
  } catch (error) {
    console.error(error);
  }
}; 


  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold mb-3">Toko Saya</h2>

      {hasStore ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <Row label="Nama Toko" value={user?.store?.name ?? "-"} />
              <Row label="Lokasi" value={user?.store?.location ?? "-"} />
              <Row label="Deskripsi" value="-" />
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Total Produk" value="0" />
              <Row label="Rating" value="-" />
            </div>
          </div>

          <button className="mt-4 w-full md:w-48 text-sm border rounded-md py-2 text-green-600" onClick={() => router.push("/store")}>
            Kelola Toko
          </button>
        </>
      ) : (
        // <button className="mt-4 w-full md:w-48 text-sm border rounded-md py-2 text-green-600">
        //   Buka Toko
        // </button>
          <form
          onSubmit={handleSubmit}
          className="space-y-4 border rounded-md p-4 text-sm"
        >
          <div>
            <label className="block mb-1">Nama Toko</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Lokasi</label>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md px-2 py-1"
            />
          </div>


          <div className="flex gap-2">
            <button
              type="button"
              className="border rounded-md px-3 py-1 text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="border rounded-md px-3 py-1 text-sm text-green-600"
            >
              Buat Toko
            </button>
          </div>
        </form>
      )}
    </div>
  );
}