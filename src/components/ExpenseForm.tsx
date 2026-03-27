"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { addExpense } from "@/app/actions";
import { format, subDays } from "date-fns";

export default function ExpenseForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize date securely avoiding hydration mismatch
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
      addExpense(formData);
    });

    if (formRef.current) formRef.current.reset();
    setDateStr(format(new Date(), 'yyyy-MM-dd')); // reset to today
  }

  return (
    <div className="bg-card text-card-foreground p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
      <h2 className="text-xl font-bold mb-4 text-primary">Add New Expense</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            required
            className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all placeholder-muted-foreground"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Category</label>
            <select
              name="category"
              required
              className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all appearance-none"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Home">Home</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Date</label>
            <input
              type="date"
              name="date"
              required
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Date Quick Selection */}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDate(0)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">Today</button>
          <button type="button" onClick={() => setDate(1)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">Yesterday</button>
          <button type="button" onClick={() => setDate(2)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:bg-secondary transition-all">2 Days Ago</button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Description</label>
          <input
            type="text"
            name="description"
            className="w-full bg-input text-foreground border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-ring focus:outline-none transition-all placeholder-muted-foreground"
            placeholder="What was it for?"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity mt-2"
        >
          {isPending ? "Saving..." : "Save Expense"}
        </button>
      </form>
    </div>
  );
}
