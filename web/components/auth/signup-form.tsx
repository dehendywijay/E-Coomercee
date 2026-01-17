"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
        const res = await axios.post("http://localhost:3001/auth/api/signup", {
        name,
        email,
        password,
        confirmPassword
      });
      if (res.data.status === true) {
        toast.success(res.data.message);
        router.push("/login");
      }else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border-0 bg-white" {...props}>
      <CardHeader className="text-center space-y-2 pb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Buat Akun Baru</CardTitle>
        <CardDescription className="text-gray-600 font-medium">
          Isi informasi di bawah untuk membuat akun Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nama Lengkap
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nama Lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required
              />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required
              />
              <FieldDescription className="text-xs text-gray-500">
                Kami akan gunakan ini untuk menghubungi Anda
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700">
                Kata Sandi
              </FieldLabel>
              <Input 
                id="password" 
                type="password" 
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required 
              />
              <FieldDescription className="text-xs text-gray-500">
                Minimal 8 karakter
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
                Konfirmasi Kata Sandi
              </FieldLabel>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="h-12 text-lg border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required 
              />
            </Field>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200/50 shadow-md transition-all duration-200"
            >
              Buat Akun
            </Button>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full h-12 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-medium shadow-sm">
                Daftar dengan Google
              </Button>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-xs text-gray-600">
                Sudah punya akun?{' '}
                <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                  Masuk sekarang
                </a>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
