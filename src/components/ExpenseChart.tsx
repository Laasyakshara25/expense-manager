"use client";

import { type Expense } from "@/app/actions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export default function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  // Aggregate expenses by category
  const dataMap = expenses.reduce((acc, exp) => {
    const cat = exp.category;
    acc[cat] = (acc[cat] || 0) + Number(exp.amount);
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    total: dataMap[key]
  })).sort((a, b) => b.total - a.total); 

  if (data.length === 0) {
    return (
      <div className="bg-card text-card-foreground p-5 sm:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-border text-center flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">No Reports Available</h2>
        <p className="text-muted-foreground">Log some expenses to generate a beautiful breakdown.</p>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground p-5 sm:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-8 text-primary">Category Breakdown</h2>
      <div className="h-[300px] sm:h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-foreground)', fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 13 }}
              tickFormatter={(value) => `$${value}`}
              dx={-5}
            />
            <Tooltip 
              cursor={{ fill: 'var(--color-secondary)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                color: 'var(--color-foreground)'
              }}
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return [`₹${value.toFixed(2)}`, 'Spent'];
                }
                return [`₹${value}`, 'Spent'];
              }}
            />
            <Bar dataKey="total" radius={[8, 8, 8, 8]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="var(--color-primary)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
