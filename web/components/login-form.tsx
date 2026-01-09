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
    
    <Card className="w-full max-w-sm" {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
    <section className="flex flex-col gap-6">
        <div className="grid gap-2"> 
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className="grid gap-2"> 
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                    Forgot your password?
                </a>
            </div>
            <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />
        </div>
        <section className="flex-col gap-2"> {/* Diganti menjadi section */}
            <a >
                <Button type="submit" variant="outline" className="w-full">
                    Login
                </Button>
            </a>
            <Button variant="outline" className="w-full">
                Login with Google
            </Button>
        </section>
    </section>
    
        </form>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        
      </CardFooter> */}
       
    </Card>
  )
}
