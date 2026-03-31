"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      await registerUser(formData);
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background p-4 z-[100] overflow-y-auto">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl flex flex-col items-center my-8">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
          <Wallet size={32} />
        </div>
        
        <h1 className="text-3xl font-black text-primary tracking-tight mb-2 text-center">Create Account</h1>
        <p className="text-muted-foreground text-center mb-6 font-medium">
          Join us to manage your personal finances and track your expenses.
        </p>

        {error && <div className="w-full p-3 bg-red-500/10 text-red-500 rounded-lg text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input 
              name="name"
              type="text" 
              required 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input 
              name="email"
              type="email" 
              required 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input 
              name="password"
              type="password" 
              required 
              minLength={6}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100 mt-2"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
