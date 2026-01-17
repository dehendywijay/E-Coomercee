"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/strings";
import { Product, Profile, Store } from "@/types/type";

 interface UserPayload  {
  id: string;
  email: string;
  name?: string;
  userId: string;
  profile: Profile | null;
  store: Store | null;
  products: Product[];             
  allProducts: Product[];       
};

interface AuthContextType  {
  user: UserPayload | null;
  token: string;
  setUser: (u: UserPayload | null) => void;
  setToken: (t: string) => void;
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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
  
        setAllProducts(allProductsRes.data.data)
        setStore(storeRes.data)
        setProducts(productRes.data[0].products)
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
  });

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
