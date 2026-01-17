"use client";

import Image from "next/image";
import {  useState } from "react";
import { NavbarDefault } from "@/components/header/navbar-form";
import { useAuth } from "@/app/context/authcontext";
import { StoreSection } from "./user-setting/user-store";
import { BiodataSection } from "./user-setting/user-profile";

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

 

export function Row({
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


