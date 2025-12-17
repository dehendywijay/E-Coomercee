"use client";

import { Input } from './ui/input'
import {  Bell, Mail, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from "react"
import axios from 'axios';


export function NavbarDefault(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nama, setNama] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [token, setToken] = useState("");

      const decodeJwtPayload = (token: string) => {
      if (!token) {
        throw new Error("Token kosong");
      }
      const base64 = token.split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      return JSON.parse(atob(base64));
    };
  
   // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshToken();
  }, []);
  
  return (
     <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 md:px-6 gap-4">
        {/* Kiri: menu (lebar tetap) */}
        <div className="flex w-[48px] justify-start">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Tengah: search benar‑benar fleksibel */}
        <div className="flex-1">
          <div className="relative max-w-xl mx-auto">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9 w-full h-9"
              type="search"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Kanan: ikon & nama, lebar kira‑kira seimbang dengan kiri */}
        <div className="flex w-[220px] items-center justify-end gap-1 md:gap-2">
          <Button variant="ghost" size="icon" aria-label="Keranjang Belanja">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifikasi">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Pesan">
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex items-center gap-2 px-2"
            aria-label="Profil Pengguna"
          >
            <User className="h-5 w-5" />
            <span className="hidden text-sm font-medium md:inline">
              {nama}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
  
}