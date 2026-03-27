import { getStocks } from "@/app/actions";
import StockForm from "@/components/StockForm";
import StockList from "@/components/StockList";
import { TrendingUp } from "lucide-react";

export const metadata = {
  title: "Stocks - Expense Manager",
};

export default async function StocksPage() {
  const stocks = await getStocks();
  const totalStocks = stocks.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
      
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-secondary text-secondary-foreground p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-border">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Stocks Portfolio</h1>
          <p className="mt-1 text-muted-foreground font-medium">Keep a record of your monthly investments.</p>
        </div>
        
        <div className="bg-card text-card-foreground px-6 py-4 rounded-2xl md:rounded-3xl shadow-sm border border-border text-center min-w-[200px] w-full sm:w-auto">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Invested</p>
          <p className="text-3xl font-black text-primary flex items-center justify-center">
            <TrendingUp size={24} strokeWidth={3} className="opacity-80 mr-2"/>
            ₹{totalStocks.toFixed(2)}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <StockForm />
        </div>
        <div className="lg:col-span-2">
          <StockList stocks={stocks} />
        </div>
      </div>

    </div>
  );
}
