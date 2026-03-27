"use client";

import { deleteSaving, type Saving } from "@/app/actions";
import { format } from "date-fns";
import { useTransition } from "react";
import { Trash2, Wallet } from "lucide-react";

export default function SavingList({ savings }: { savings: Saving[] }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: number) {
    if (confirm("Delete this savings deposit?")) {
      startTransition(() => {
        deleteSaving(id);
      });
    }
  }

  if (savings.length === 0) {
    return (
      <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-sm border border-border text-center">
        <p className="text-muted-foreground">No savings logged yet. Pay yourself first!</p>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-border overflow-hidden">
      <h2 className="text-xl font-bold mb-6 text-primary">Recent Deposits</h2>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-4">
        {savings.map((saving) => (
          <div key={saving.id} className="flex justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-background border border-border hover:shadow-md transition-all group">
            <div className="flex gap-3 sm:gap-4 items-center min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5">
                <Wallet size={24} className="text-teal-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-foreground tracking-tight capitalize">
                  {saving.goal}
                </span>
                {saving.description && (
                  <span className="text-sm text-foreground/80 font-medium my-[1px] line-clamp-1">
                    {saving.description}
                  </span>
                )}
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                  {format(new Date(saving.date), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
              <span className="font-extrabold text-foreground text-lg">
                +₹{Number(saving.amount).toFixed(2)}
              </span>
              <button onClick={() => handleDelete(saving.id)} className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-destructive hover:bg-destructive/10 rounded-full px-3 py-1 text-xs font-bold transition-all flex items-center gap-1">
                <Trash2 size={12} strokeWidth={3} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
