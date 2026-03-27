import { Calendar as CalendarIcon } from "lucide-react";

export default function LoadingCalendar() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground opacity-50">Interactive Calendar</h1>
      </div>
      
      <div className="bg-card text-card-foreground p-6 rounded-3xl shadow-sm border border-border flex flex-col items-center justify-center h-[600px] w-full animate-pulse">
        <CalendarIcon size={64} className="text-primary/40 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold text-muted-foreground">Fetching your beautiful calendar...</h2>
      </div>
    </div>
  );
}
