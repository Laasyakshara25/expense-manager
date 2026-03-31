import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("Creating users table...");
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255)
    );
  `;

  console.log("Adding user_email column to expenses...");
  await sql`ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);`;

  console.log("Adding user_email column to stocks...");
  await sql`ALTER TABLE stocks ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);`;

  console.log("Adding user_email column to savings...");
  await sql`ALTER TABLE savings ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);`;

  console.log("Migration completed.");
}

main().catch(console.error);
