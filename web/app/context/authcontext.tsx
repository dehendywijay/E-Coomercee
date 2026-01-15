"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/strings";
import { Product, Profile, Store, User, UserPayload } from "@/types/type";


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
      let productsDetails: Product | undefined = undefined;
      let userProfile : User | undefined = undefined;
    
      try{
        const userRes = await axios.get(
          `http://localhost:3001/api/user/profile`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
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
          `${api}/products/1`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
         }
       )

        userProfile = userRes.data;
        store = storeRes.data;
        products = productRes.data[0].products;
        productsDetails = productsDetailsRes.data;
        profile = profileRes.data;
      
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
        user: userProfile,
        userId: decoded.userId,
        profile,
        store,
        products,
        productsDetails
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
