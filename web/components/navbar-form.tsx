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
  const refreshToken = async () => {
    console.log("refreshToken jalan");
    try {
      const response = await axios.get("http://localhost:3001/api/auth/refresh",{
        withCredentials: true,
      });
      
  const accessToken = response.data.accesToken;
  setToken(accessToken);
  const decoded = decodeJwtPayload(accessToken);
  setNama(decoded.name);
  console.log("decoded payload:", decoded.name);
  
    } catch (error) {
        console.error("error refreshToken:", error);
    }
  }
   // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshToken();
  }, []);
  
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
            <p>{nama}</p>
            </Button>
          </section>
      </section>
    </section>
  )
}