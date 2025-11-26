"use client";

import React from 'react'
import { Input } from './ui/input'
import { AlarmCheckIcon, Bell, Mail, Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
export function HomeForm(){
  return (
    <section className="flex items-top space-x-2 w-full max-w-lg" >
      <Button 
        variant="ghost" // Menggunakan varian 'outline' agar terlihat seperti tombol UI
        size="icon-lg"     // Menggunakan ukuran 'icon' agar tombol menjadi persegi kecil
        aria-label="Keranjang Belanja"
        
      >
        <Menu className="h-5 w-5" />
      </Button>

        <section className="relative flex-grow ">
          <Search className="absolute left-3 top-4.25 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <Input className="pl-9 w-full"
          type="search" 
          placeholder="search" 
          />
        </section>
        <section className="flex ml-7">
          <Button 
            variant="ghost" // Menggunakan varian 'outline' agar terlihat seperti tombol UI
            size="icon-lg"     // Menggunakan ukuran 'icon' agar tombol menjadi persegi kecil
            aria-label="Keranjang Belanja"
            
          >
            <ShoppingCart className="h-5 w-5 " />
          </Button>

          <Button 
            variant="ghost" // Menggunakan varian 'outline' agar terlihat seperti tombol UI
            size="icon-lg"     // Menggunakan ukuran 'icon' agar tombol menjadi persegi kecil
            aria-label="Keranjang Belanja"
            
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" // Menggunakan varian 'outline' agar terlihat seperti tombol UI
            size="icon-lg"     // Menggunakan ukuran 'icon' agar tombol menjadi persegi kecil
            aria-label="Keranjang Belanja"
            
          >
            <Mail className="h-5 w-5" />
          </Button>
          
        </section>

    </section>
  )
}
