"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NavbarDefault } from "@/components/header/navbar-form";
import { useAuth } from "@/app/context/authcontext";
import axios from "axios";

const tabs = [
  "Biodata Diri",
  "Store",
];

export  function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Biodata Diri");
  const {user} = useAuth();
  return (
    <main className="min-h-screen bg-gray-100">
      <NavbarDefault/>
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{user?.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          Dikirim ke <span className="font-semibold">Rumah {user?.name}</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-6 flex gap-6">
        
        <aside className="w-64 bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-500 overflow-hidden">
             
              <Image
                src="/avatar-placeholder.png"
                alt="Avatar"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">{user?.name}</p>
              <p className="text-xs text-gray-400"></p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold"></p>
              <button className="text-xs text-green-600"></button>
            </div>
            <div>
              <p className="font-semibold"></p>
              <button className="text-xs text-green-600"></button>
            </div>
            <div>
              <p className="font-semibold"></p>
              <p className="text-xs text-gray-500"></p>
            </div>
          </div>
        </aside>

        {/* Konten kanan */}
        <section className="flex-1 bg-white rounded-lg shadow-sm border p-6">
          {/* Tabs */}
          <nav className="border-b mb-4">
            <ul className="flex gap-6 text-sm">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2 border-green-600 text-green-600 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </nav>

          {activeTab === "Biodata Diri" && <BiodataSection />}
          {activeTab === "Store" && <StoreSection />}
        </section>
      </section>
    </main>
  );
}

 function BiodataSection() {
  const {user} = useAuth();
  

  const [name, setName] = useState<string>("-");
  const [birthDate, setBirthDate] = useState<string>(""); // "YYYY-MM-DD"
  const [gender, setGender] = useState<string | null>(user?.profile?.gender ?? "");
  const [phone, setPhone] = useState<string>( "-");
  
  useEffect(() => {
  if (user?.profile?.phone) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhone(user.profile.phone);
  }
   if (user?.name) {
    setName(user.name);
  }
}, [user]);

  // state edit
  const [editingName, setEditingName] = useState(false);
  const [editingBirthDate, setEditingBirthDate] = useState(false);
  const [editingGender, setEditingGender] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  // draft
  const [draftName, setDraftName] = useState("");
  const [draftBirthDate, setDraftBirthDate] = useState("");
  const [draftGender, setDraftGender] = useState("");
  const [draftPhone, setDraftPhone] = useState("");

const openEditPhone = () => {
    setDraftPhone( phone === "-" ? "" : phone );
    setEditingPhone(true);
  };

  const savePhone = async () => {
    try{
        const response = await axios.get("http://localhost:3001/api/auth/refresh", {
            withCredentials: true,
          });
        const token = response.data.accesToken;
        setEditingName(false);
        await axios.post("http://localhost:3001/api/user/profil", { 
          phone: draftPhone }, 
          { 
            headers: { Authorization: `Bearer ${token}` ,
          },
          withCredentials: true })
          setPhone(draftPhone);
          setEditingPhone(false);
          window.location.reload();
      }catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("status:", err.response?.status);
          console.log("data:", err.response?.data);
        } else {
          console.log(err);
        }
      }
    };
    

  const openEditName = () => {
    setDraftName(name || user?.name || "");
    setEditingName(true);
  };

  
  const saveName = async () => {
    try{
      const response = await axios.get("http://localhost:3001/api/auth/refresh", {
           withCredentials: true,
         });
      const token = response.data.accesToken;
      setName(draftName);
      setEditingName(false);
      window.location.reload();
      await axios.post("http://localhost:3001/api/user/profil", { 
        name: draftName }, 
        { 
          headers: { Authorization: `Bearer ${token}` ,
        },
        withCredentials: true })
    }catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
      } else {
        console.log(err);
      }
}
  };

  
  
  const openEditBirthDate = () => {
    setDraftBirthDate(birthDate || "");
    setEditingBirthDate(true);
  };

  const saveBirthDate = async () => {
    setBirthDate(draftBirthDate);
    setEditingBirthDate(false);
    await axios.post("http://localhost:3001/api/user/profile", { birthDate: draftBirthDate }, { withCredentials: true })
  };



  // JENIS KELAMIN
  const openEditGender = () => {
    setDraftGender(gender ?? "");
    setEditingGender(true);
  };

  const saveGender = async() => {
    try{
      setGender(draftGender);
      setEditingGender(false);
      await axios.post("http://localhost:3001/api/user/profil", { 
        gender: draftGender}, 
        { 
      
        withCredentials: true })
    }
    catch(err){
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data); // ⬅ penting
      }
    }
  };
  return (
    <div className="flex gap-8">
      {/* Foto profil */}
      <div className="w-64 flex flex-col items-center">
        <div className="w-56 h-56 bg-blue-500 rounded-md overflow-hidden mb-4" />
        <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
          Pilih Foto
        </button>
      </div>

      {/* Form biodata */}
      <div className="flex-1 text-sm space-y-6">
        <section>
          <h2 className="font-semibold mb-3">Ubah Biodata Diri</h2>
           <Row 
              label="Nama"
              value={
                editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      className="border px-2 py-1 text-sm"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                    />
                    <button className="text-xs text-green-600" onClick={saveName}>
                      Simpan
                    </button>
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => setEditingName(false)}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  user?.name || "-"
                )
              }
              action={editingName ? undefined : phone ? "Ubah" : "Tambah Nomor"}
              onAction={editingName ? undefined : openEditName}
           
             />
           

          <Row label="Tanggal Lahir" value={user?.profile?.birthDate ?? "-"} action="Tambah Tanggal Lahir" />
           <Row
          label="Jenis Kelamin"
          value={gender ?? "-"}
          action={gender ? "Ubah Jenis Kelamin" : "Tambah Jenis Kelamin"}
          onAction={openEditGender}
        />
        {editingGender && (
          <div className="mt-2 flex items-center gap-2">
            <select
              className="border px-2 py-1 text-sm"
              value={draftGender}
              onChange={(e) => setDraftGender(e.target.value)}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
            <button 
            className="text-xs text-green-600" 
            onClick={saveGender}>
              Simpan
            </button>
            <button
              className="text-xs text-gray-500"
              onClick={() => setEditingGender(false)}
            >
              Batal
            </button>
          </div>
        )}

        </section>

        <section>
          <h2 className="font-semibold mb-3">Ubah Kontak</h2>
          <Row label="Email" 
          value={user?.email ?? "-"} 
          action={user?.email  ? "Ubah" : "Tambah Phone"} />
          <Row
            label="Nomor HP"
              value={
                editingPhone ? (
                  <div className="flex items-center gap-2">
                    <input
                      className="border px-2 py-1 text-sm"
                      value={draftPhone}
                      onChange={(e) => setDraftPhone(e.target.value)}
                    />
                    <button className="text-xs text-green-600" onClick={savePhone}>
                      Simpan
                    </button>
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => setEditingPhone(false)}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  user?.profile?.phone || "-"
                )
              }
            action={editingPhone ? undefined : phone ? "Ubah" : "Tambah Nomor"}
            onAction={editingPhone ? undefined : openEditPhone}
          />
          </section>
        </div>
      </div>
    );
  }

function Row({
  label,
  value,
  action,
  extra,
  onAction,
}: {
  label: string;
  value: React.ReactNode;
  action?: string;
  extra?: React.ReactNode;
  onAction?: () => void;
}) {
  const isString = typeof value === "string" || typeof value === "number";
  
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        {isString ? (
          <p className="text-sm">{value}</p>
        ) : (
          <div className="text-sm">{value}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {extra}
        {action && (
          <button
            className="text-xs text-green-600 hover:underline"
            onClick={onAction}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
}


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