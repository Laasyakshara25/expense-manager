"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { addSaving } from "@/app/actions";
import { format, subDays } from "date-fns";

export default function SavingForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    setDateStr(format(new Date(), 'yyyy-MM-dd'));
  }, []);

  function setDate(offset: number) {
    setDateStr(format(subDays(new Date(), offset), 'yyyy-MM-dd'));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      addSaving(formData);
    });
    if (formRef.current) formRef.current.reset();
    setDateStr(format(new Date(), 'yyyy-MM-dd')); 
  }

  return (
    <div className="bg-card text-card-foreground p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
      <h2 className="text-xl font-bold mb-4 text-primary">Deposit Savings</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Amount Saved (₹)</label>
          <input type="number" name="amount" step="0.01" required placeholder="0.00" className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all placeholder-muted-foreground"/>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Saving Goal / Vault</label>
            <input type="text" name="goal" required placeholder="e.g. Vacation, Emergency" className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all placeholder-muted-foreground"/>
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Date</label>
            <input type="date" name="date" required value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all"/>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDate(0)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">Today</button>
          <button type="button" onClick={() => setDate(1)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">Yesterday</button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Notes</label>
          <input type="text" name="description" placeholder="Optional context..." className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all placeholder-muted-foreground"/>
        </div>

        <button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity mt-2">
          {isPending ? "Depositing..." : "Deposit to Savings"}
        </button>
      </form>
    </div>
  );
}
