"use client";

import Image from "next/image";
import { useState } from "react";
import { NavbarDefault } from "./navbar-form";

const tabs = [
  "Biodata Diri",
];

export  function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Biodata Diri");

  return (
    <main className="min-h-screen bg-gray-100">
      <NavbarDefault/>
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Dehendy</span>
        </div>
        <div className="text-sm text-gray-500">
          Dikirim ke <span className="font-semibold">Rumah Dehendy</span>
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
              <p className="text-sm text-gray-500">Dehendy</p>
              <p className="text-xs text-gray-400">PLUS •</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold">GoPay</p>
              <button className="text-xs text-green-600">Aktifkan</button>
            </div>
            <div>
              <p className="font-semibold">Tokopedia Card</p>
              <button className="text-xs text-green-600">Daftar</button>
            </div>
            <div>
              <p className="font-semibold">Saldo</p>
              <p className="text-xs text-gray-500">Rp0</p>
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
        </section>
      </section>
    </main>
  );
}

function BiodataSection() {
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

          <Row label="Nama" value="Dehendy" action="Ubah" />
          <Row label="Tanggal Lahir" value="-" action="Tambah Tanggal Lahir" />
          <Row label="Jenis Kelamin" value="-" action="Tambah Jenis Kelamin" />
        </section>

        <section>
          <h2 className="font-semibold mb-3">Ubah Kontak</h2>
          <Row label="Email" value="dehendy@example.com" action="Tambah Email" />
          <Row
            label="Nomor HP"
            value="6289520218139"
            action="Ubah"
            extra={<span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Terverifikasi</span>}
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
}: {
  label: string;
  value: string;
  action: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
      <div className="flex items-center gap-2">
        {extra}
        <button className="text-xs text-green-600 hover:underline">{action}</button>
      </div>
    </div>
  );
}
