"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast} from "sonner";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
        const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      },{
          withCredentials: true, 
      });
      console.log(res.data.message);
      if (res.data.status === true) {
        toast.success(res.data.message);
        router.push("/home");
      }else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border-0 bg-white" {...props}>
      <CardHeader className="text-center space-y-2 pb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Masuk ke Akun</CardTitle>
        <CardDescription className="text-gray-600 font-medium">
          Masukkan email dan kata sandi Anda
        </CardDescription>
        <CardAction className="justify-center pt-4">
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-emerald-600 font-medium" onClick={() => router.push("/signup")}>
            Belum punya akun? <span className="font-semibold" >Daftar</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Kata Sandi
                </Label>
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                  Lupa Kata Sandi?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200/50 shadow-md transition-all duration-200"
            >
              Masuk
            </Button>
            <div className="pt-4">
              <Button variant="outline" className="w-full h-12 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-medium shadow-sm">
                Masuk dengan Google
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
