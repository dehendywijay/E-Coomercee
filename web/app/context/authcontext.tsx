"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
type Profile = {
  id: string;
  address?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  
};

type UserPayload = {
  id: string;
  email: string;
  name?: string;
  profile?: Profile;
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
    console.log("refresh token");
    try {
      const response = await axios.get("http://localhost:3001/api/auth/refresh", {
        withCredentials: true,
      });

      const accessToken = response.data.accesToken;
      setToken(accessToken);

      const decoded = decodeJwtPayload(accessToken);
      let profile: Profile | undefined = undefined;
      try{
        const profileRes = await axios.get(
          `http://localhost:3001/api/user/profil/${decoded.id}`,{ 
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true 
          }
       );
        profile = profileRes.data;
      }catch(err){
          if (axios.isAxiosError(err) && err.response?.status === 404) {
          profile = undefined;
        } else {
          throw err; 
        }
      }


      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        profile,
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
