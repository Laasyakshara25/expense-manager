import { getExpenses } from "@/app/actions";
import ExpenseCalendar from "@/components/ExpenseCalendar";

export const metadata = {
  title: "Calendar - Expense Manager",
};

export default async function CalendarPage() {
  const expenses = await getExpenses();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Interactive Calendar</h1>
        <p className="mt-1 text-muted-foreground font-medium">Click on days to view or schedule entries.</p>
      </div>
      <ExpenseCalendar expenses={expenses} />
    </div>
  );
}
