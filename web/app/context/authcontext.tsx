"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/strings";

interface Profile  {
  id: string;
  address?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
};

interface Store  {
  name   :  string  
  location  : string
}
export interface allProducts  {
  id : string;
  name            : string
  imageSrc        : string
  stock         : number
  originalPrice    : number
  discountPercentage : number
  rating            : number
  salesCount        : string
  bonusText         : string
  location     :    string
  description : string
  storeId?: string
}

interface Product {
  id : string;
  name            : string
  imageSrc        : string
  stock         : number
  originalPrice    : number
  discountPercentage? : number
  rating            : number
  salesCount        : string
  bonusText         : string
  location     :    string
  description : string
}

 interface UserPayload  {
  id: string;
  email: string;
  name?: string;
  userId: string;
  profile: Profile | null;
  store: Store | null;
  products: Product[];             
  allProducts: allProducts[];       
  productsDetails: Product[];
};

interface AuthContextType  {
  user: UserPayload | null;
  token: string;
  setUser: (u: UserPayload | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJwtPayload = (token: string) => {
  if (!token) throw new Error("Token kosong");
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDetails, setProductsDetails] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<allProducts[]>([]);
;

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/refresh", {
        withCredentials: true,
      });

      const accessToken = response.data.accesToken;
      setToken(accessToken);

      const decoded = decodeJwtPayload(accessToken);
      try{
        const profileRes = await axios.get(
          `http://localhost:3001/api/user/profile/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const storeRes = await axios.get(
          `http://localhost:3001/api/store/account/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const productRes = await axios.get(
          `http://localhost:3001/api/store/products/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const allProductsRes = await axios.get(
          `http://localhost:3001/api/products`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const productsDetailsRes = await axios.get(
          `${api}/products/details/7`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
         }
       )

        setAllProducts(allProductsRes.data.data)
        setStore(storeRes.data)
        setProducts(productRes.data[0].products)
        setProductsDetails(productsDetailsRes.data)
        setProfile(profileRes.data)
      }catch(err){
          if (axios.isAxiosError(err) && err.response?.status === 404) {  
        } else {
          throw err; 
        }
      }

      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        userId: decoded.userId,
        profile,
        store,
        products,
        productsDetails ,
        allProducts
      });
    } catch (error) {
      console.error("error refreshToken:", error);
      setUser(null);
      setToken("");
    }
  };

  useEffect(() => {
    refreshToken();
    
  }, [allProducts, store, profile, products, productsDetails]);

  return (
    <AuthContext.Provider value={{ user, token, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
