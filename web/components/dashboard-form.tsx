"use client";

import React from 'react'
import { Input } from './ui/input'
import {  Bell, Mail, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { EmblaCarousel } from './ui/embla';
import { ProductCard } from './ui/productcard';


export function HomeForm(){


  return (
    <section className="flex flex-col min-h-svh items-center w-full p-6 md:p-10 bg-gray-200">
      <section className="flex space-x-2 w-full max-w-lg" >
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

          <section className="flex ml-7">
            <Button 
              variant="ghost" // Menggunakan varian 'outline' agar terlihat seperti tombol UI
              size="icon-lg"     // Menggunakan ukuran 'icon' agar tombol menjadi persegi kecil
              aria-label="Keranjang Belanja"
              
            >
            <User className="h-5 w-5" />
            </Button>
          </section>
      </section>
      <section className='flex flex-col mt-10' >
        <EmblaCarousel/>
      </section>
      <section>
        
      </section>
    </section>
  )
}
