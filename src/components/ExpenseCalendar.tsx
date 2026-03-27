"use client";

import { Calendar, dateFnsLocalizer, ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { type Expense } from "@/app/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CustomToolbar(toolbar: any) {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const goToCurrent = () => toolbar.onNavigate('TODAY');

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
        <div className="flex gap-2">
          <button onClick={goToBack} className="flex items-center justify-center w-10 h-10 border border-border rounded-xl hover:bg-secondary text-foreground transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goToNext} className="flex items-center justify-center w-10 h-10 border border-border rounded-xl hover:bg-secondary text-foreground transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
        <button onClick={goToCurrent} className="px-5 py-2.5 border border-border rounded-xl font-bold bg-background text-foreground hover:bg-secondary transition-all text-sm shadow-sm hidden md:block">
          Today
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight capitalize">
        {toolbar.label}
      </h2>

      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
        {(['month', 'week', 'day'] as const).map(viewName => (
          <button 
            key={viewName}
            onClick={() => toolbar.onView(viewName)} 
            className={`flex-1 md:flex-none capitalize px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              toolbar.view === viewName 
              ? 'bg-primary text-primary-foreground border-transparent' 
              : 'bg-background border border-border text-foreground hover:bg-secondary'
            }`}
          >
            {viewName}
          </button>
        ))}
      </div>
    </div>
  );
}

const CustomEvent = ({ event }: any) => {
  return (
    <div className="flex flex-col truncate px-1 py-0.5">
      <div className="font-bold text-[10px] sm:text-xs truncate tracking-tight">
        {event.title.split('-')[0]}
      </div>
      <div className="font-extrabold text-[10px] sm:text-xs opacity-90 truncate">
        -{event.title.split('-')[1]}
      </div>
    </div>
  );
};

export default function ExpenseCalendar({ expenses }: { expenses: Expense[] }) {
  const events = expenses.map(exp => ({
    id: exp.id,
    title: `${exp.category} -₹${Number(exp.amount).toFixed(2)}`,
    start: new Date(exp.date),
    end: new Date(exp.date),
    allDay: true,
  }));

  return (
    <div className="bg-card text-card-foreground p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-border">
      <div className="h-[500px] sm:h-[700px] w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          className="cute-calendar"
          components={{
            toolbar: CustomToolbar,
            event: CustomEvent,
          }}
        />
      </div>

      <style jsx global>{`
        .cute-calendar {
          font-family: inherit;
          color: var(--color-foreground);
        }
        
        .cute-calendar .rbc-toolbar {
          display: none; /* We render our CustomToolbar */
        }

        /* Headers and Borders */
        .cute-calendar .rbc-header {
          padding: 12px 6px;
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--color-muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid var(--color-border) !important;
          border-left: none;
        }
        
        .cute-calendar .rbc-month-view,
        .cute-calendar .rbc-time-view,
        .cute-calendar .rbc-month-row,
        .cute-calendar .rbc-day-bg,
        .cute-calendar .rbc-header + .rbc-header {
          border-color: var(--color-border) !important;
        }
        .cute-calendar .rbc-month-view, .cute-calendar .rbc-time-view {
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-background);
        }

        /* Cells */
        .cute-calendar .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid var(--color-border);
        }
        .cute-calendar .rbc-off-range-bg {
          background-color: var(--color-secondary);
          opacity: 0.3;
        }
        .cute-calendar .rbc-today {
          background-color: var(--color-primary);
          opacity: 0.05;
        }
        .cute-calendar .rbc-date-cell {
          font-weight: 800;
          padding: 8px 10px;
          font-size: 0.9rem;
          color: var(--color-foreground);
        }
        .cute-calendar .rbc-off-range {
          color: var(--color-muted-foreground);
          opacity: 0.4;
        }

        /* Events */
        .cute-calendar .rbc-event {
          background-color: var(--color-primary) !important;
          color: var(--color-primary-foreground) !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 2px !important;
          margin: 2px 4px !important;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06) !important;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cute-calendar .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05) !important;
          z-index: 10;
        }
        .cute-calendar .rbc-event.rbc-selected {
          background-color: var(--color-primary) !important;
          outline: 2px solid var(--color-ring) !important;
          outline-offset: 2px;
        }
        .cute-calendar .rbc-row-segment {
          padding: 0;
        }
      `}</style>
    </div>
  );
}
