import { getSavings } from "@/app/actions";
import SavingForm from "@/components/SavingForm";
import SavingList from "@/components/SavingList";
import { Wallet } from "lucide-react";

export const metadata = {
  title: "Savings - Expense Manager",
};

export default async function SavingsPage() {
  const savings = await getSavings();
  const totalSavings = savings.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
      
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-secondary text-secondary-foreground p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-border">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Savings Goals</h1>
          <p className="mt-1 text-muted-foreground font-medium">Watch your deposits and emergency funds grow over time.</p>
        </div>
        
        <div className="bg-card text-card-foreground px-6 py-4 rounded-2xl md:rounded-3xl shadow-sm border border-border text-center min-w-[200px] w-full sm:w-auto">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Saved</p>
          <p className="text-3xl font-black text-primary flex items-center justify-center">
            <Wallet size={24} strokeWidth={3} className="opacity-80 mr-2"/>
            ₹{totalSavings.toFixed(2)}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <SavingForm />
        </div>
        <div className="lg:col-span-2">
          <SavingList savings={savings} />
        </div>
      </div>

    </div>
  );
}
