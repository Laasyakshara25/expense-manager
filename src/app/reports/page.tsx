import { getExpenses } from "@/app/actions";
import ExpenseChart from "@/components/ExpenseChart";

export const metadata = {
  title: "Reports - Expense Manager",
};

export default async function ReportsPage() {
  const expenses = await getExpenses();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground">Spending Reports</h1>
        <p className="mt-1 text-muted-foreground font-medium">A visual overview of your financial habits.</p>
      </div>
      
      <ExpenseChart expenses={expenses} />
    </div>
  );
}
