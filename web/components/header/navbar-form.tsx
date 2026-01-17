"use client";

import { Input } from '@/components/ui/input'
import { Bell, Mail, Menu, Search, ShoppingCart, User, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/context/authcontext';
import { useRouter } from "next/navigation";

export function NavbarDefault(){
  const {user} = useAuth();
  const router = useRouter();
  return (
    <header className="w-full border-b bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 md:px-6 gap-4">
        <div className="flex w-12 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors h-10 w-10"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 h-10 shadow-sm hover:shadow-md hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-200 border border-emerald-100 hover:border-emerald-200"
          aria-label="Profil Pengguna"
          onClick={() => router.push("/home")}
        >
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
            <Package className="h-5 w-5 text-white"  />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            ecoomercee
          </span>
        </div>
        </Button>
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search 
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" 
            />
            <Input
              className="pl-10 pr-4 h-11 text-lg shadow-sm border-emerald-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 hover:border-emerald-200 transition-all duration-200 placeholder:text-gray-500"
              type="search"
              placeholder="Cari produk, toko, atau kategori..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-emerald-50 hover:text-emerald-600 h-10 w-10 shadow-sm transition-all duration-200 relative"
            aria-label="Keranjang Belanja"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg">3</div>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-emerald-50 hover:text-emerald-600 h-10 w-10 shadow-sm transition-all duration-200 relative"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">2</div>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-emerald-50 hover:text-emerald-600 h-10 w-10 shadow-sm transition-all duration-200"
            aria-label="Pesan"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 h-10 shadow-sm hover:shadow-md hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-200 border border-emerald-100 hover:border-emerald-200"
          aria-label="Profil Pengguna"
          onClick={() => router.push("/user/setting")}
        >
          <User className="h-5 w-5 flex-shrink-0" />
          <div className="hidden md:flex flex-col items-start text-left leading-tight">
            <span className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
              {user?.name || 'Halo, User'}
            </span>
            <span className="text-xs text-emerald-600 font-medium">Kelola</span>
          </div>
          <svg className="h-4 w-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </header>
  );
}
