"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar as CalendarIcon, PieChart, Menu, X, TrendingUp, Wallet, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon },
    { name: "Reports", href: "/reports", icon: PieChart },
    { name: "Stocks", href: "/stocks", icon: TrendingUp },
    { name: "Savings", href: "/savings", icon: Wallet },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="md:hidden fixed top-0 left-0 p-4 text-primary z-[60] bg-background/80 backdrop-blur-md rounded-br-2xl border-b border-r border-border shadow-sm"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 flex justify-between items-center border-b border-border mt-2 md:mt-0">
          <h1 className="text-2xl font-black text-primary tracking-tight">ExpenseApp</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          {session?.user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2">
                {session.user.image ? (
                  <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {session.user.name?.[0] || session.user.email?.[0] || "U"}
                  </div>
                )}
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold truncate">{session.user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{session.user.email}</span>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-muted-foreground hover:bg-red-500/10 hover:text-red-500 w-full"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-bold transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm w-full"
            >
              <LogIn size={20} />
              Sign In with Google
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
