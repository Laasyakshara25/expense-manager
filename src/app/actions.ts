"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- EXPENSES ---
export type Expense = {
  id: number;
  amount: number;
  category: string;
  date: string | Date;
  description: string | null;
  created_at: string | Date;
};

export async function getExpenses() {
  return await sql`SELECT * FROM expenses ORDER BY date DESC, created_at DESC` as Expense[];
}

export async function addExpense(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  await sql`INSERT INTO expenses (amount, category, date, description) VALUES (${amount}, ${category}, ${date}, ${description})`;
  revalidatePath("/");
  revalidatePath("/calendar");
  revalidatePath("/reports");
}

export async function deleteExpense(id: number) {
  await sql`DELETE FROM expenses WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/calendar");
  revalidatePath("/reports");
}

// --- STOCKS ---
export type Stock = {
  id: number;
  amount: number;
  ticker: string;
  date: string | Date;
  description: string | null;
  created_at: string | Date;
};

export async function getStocks() {
  return await sql`SELECT * FROM stocks ORDER BY date DESC, created_at DESC` as Stock[];
}

export async function addStock(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const ticker = formData.get("ticker") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  await sql`INSERT INTO stocks (amount, ticker, date, description) VALUES (${amount}, ${ticker}, ${date}, ${description})`;
  revalidatePath("/stocks");
}

export async function deleteStock(id: number) {
  await sql`DELETE FROM stocks WHERE id = ${id}`;
  revalidatePath("/stocks");
}

// --- SAVINGS ---
export type Saving = {
  id: number;
  amount: number;
  goal: string;
  date: string | Date;
  description: string | null;
  created_at: string | Date;
};

export async function getSavings() {
  return await sql`SELECT * FROM savings ORDER BY date DESC, created_at DESC` as Saving[];
}

export async function addSaving(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const goal = formData.get("goal") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  await sql`INSERT INTO savings (amount, goal, date, description) VALUES (${amount}, ${goal}, ${date}, ${description})`;
  revalidatePath("/savings");
}

export async function deleteSaving(id: number) {
  await sql`DELETE FROM savings WHERE id = ${id}`;
  revalidatePath("/savings");
}
