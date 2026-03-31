"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing fields");
  }

  const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (existingUser.length > 0) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await sql`INSERT INTO users (name, email, password) VALUES (${name || null}, ${email}, ${hashedPassword})`;
}

async function getUserEmail() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }
  return session.user.email;
}

// --- EXPENSES ---
export type Expense = {
  id: number;
  amount: number;
  category: string;
  date: string | Date;
  description: string | null;
  created_at: string | Date;
  user_email?: string | null;
};

export async function getExpenses() {
  const session = await auth();
  if (!session?.user?.email) return [];
  const email = session.user.email;
  return await sql`SELECT * FROM expenses WHERE user_email = ${email} ORDER BY date DESC, created_at DESC` as Expense[];
}

export async function addExpense(formData: FormData) {
  const email = await getUserEmail();
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  
  await sql`INSERT INTO expenses (amount, category, date, description, user_email) VALUES (${amount}, ${category}, ${date}, ${description}, ${email})`;
  revalidatePath("/");
  revalidatePath("/calendar");
  revalidatePath("/reports");
}

export async function deleteExpense(id: number) {
  const email = await getUserEmail();
  await sql`DELETE FROM expenses WHERE id = ${id} AND user_email = ${email}`;
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
  user_email?: string | null;
};

export async function getStocks() {
  const session = await auth();
  if (!session?.user?.email) return [];
  const email = session.user.email;
  return await sql`SELECT * FROM stocks WHERE user_email = ${email} ORDER BY date DESC, created_at DESC` as Stock[];
}

export async function addStock(formData: FormData) {
  const email = await getUserEmail();
  const amount = Number(formData.get("amount"));
  const ticker = formData.get("ticker") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  
  await sql`INSERT INTO stocks (amount, ticker, date, description, user_email) VALUES (${amount}, ${ticker}, ${date}, ${description}, ${email})`;
  revalidatePath("/stocks");
}

export async function deleteStock(id: number) {
  const email = await getUserEmail();
  await sql`DELETE FROM stocks WHERE id = ${id} AND user_email = ${email}`;
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
  user_email?: string | null;
};

export async function getSavings() {
  const session = await auth();
  if (!session?.user?.email) return [];
  const email = session.user.email;
  return await sql`SELECT * FROM savings WHERE user_email = ${email} ORDER BY date DESC, created_at DESC` as Saving[];
}

export async function addSaving(formData: FormData) {
  const email = await getUserEmail();
  const amount = Number(formData.get("amount"));
  const goal = formData.get("goal") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  
  await sql`INSERT INTO savings (amount, goal, date, description, user_email) VALUES (${amount}, ${goal}, ${date}, ${description}, ${email})`;
  revalidatePath("/savings");
}

export async function deleteSaving(id: number) {
  const email = await getUserEmail();
  await sql`DELETE FROM savings WHERE id = ${id} AND user_email = ${email}`;
  revalidatePath("/savings");
}
