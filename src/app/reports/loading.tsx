import { PieChart } from "lucide-react";

export default function LoadingReports() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground opacity-50">Spending Reports</h1>
      </div>
      
      <div className="bg-card text-card-foreground p-6 rounded-3xl shadow-sm border border-border flex flex-col items-center justify-center h-[500px] w-full animate-pulse">
        <PieChart size={64} className="text-primary/40 mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-muted-foreground">Calculating your charts...</h2>
      </div>
    </div>
  );
}
