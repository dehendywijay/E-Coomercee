"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
type Profile = {
  id: string;
  address?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
};

type Store = {
  name   :  string  
  location  : string
}
type allProducts = {
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
  store : string
}

type Product = {
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

type UserPayload = {
  id: string;
  email: string;
  name?: string;
  userId: string;
  profile?: Profile;
  store?: Store;
  products?: Product[];
  allProducts?: allProducts[];
};

type AuthContextType = {
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

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/refresh", {
        withCredentials: true,
      });

      const accessToken = response.data.accesToken;
      setToken(accessToken);

      const decoded = decodeJwtPayload(accessToken);
      let profile: Profile | undefined = undefined;
      let store: Store | undefined = undefined;
      let products: Product[] | undefined = undefined;
      let allProducts: allProducts[] | undefined = undefined;
    
      try{
        const profileRes = await axios.get(
          `http://localhost:3001/api/user/profil/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const storeRes = await axios.get(
          `http://localhost:3001/api/store/akun/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const productRes = await axios.get(
          `http://localhost:3001/api/store/product/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
       const allProductsRes = await axios.get(
          `http://localhost:3001/api/product`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
        const raw = allProductsRes.data as { products: allProducts[] }[];
        allProducts = raw.flatMap((item) => item.products);
        store = storeRes.data;
        products = productRes.data[0].products;
        profile = profileRes.data;
        console.log("productRes.data =", productRes.data[0].products);
        console.log("al.data =", allProducts);
      }catch(err){
          if (axios.isAxiosError(err) && err.response?.status === 404) {
          profile = undefined;
          store = undefined;
          products = undefined;
          
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
  }, []);

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
