"use client";

import { Input } from './ui/input'
import {  Bell, Mail, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { EmblaCarousel } from './ui/embla';



export function HomeForm(){


  return (
    <section className="flex flex-col min-h-svh items-center w-full p-6 md:p-10 bg-gray-200">
      <section className="flex space-x-2 w-full max-w-lg" >
        <Button 
          variant="ghost" 
          size="icon-lg"    
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
              variant="ghost" 
              size="icon-lg"     
              aria-label="Keranjang Belanja"
              
            >
              <ShoppingCart className="h-5 w-5 " />
            </Button>

            <Button 
              variant="ghost" 
              size="icon-lg"    
              aria-label="Keranjang Belanja"
              
            >
              <Bell className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon-lg"     
              aria-label="Keranjang Belanja"
              
            >
              <Mail className="h-5 w-5" />
            </Button>
            
          </section>

          <section className="flex ml-7">
            <Button 
              type='submit'
              className='transition active:scale-95 hover:bg-blue-600'
              variant="ghost" 
              size="icon-lg"     
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
