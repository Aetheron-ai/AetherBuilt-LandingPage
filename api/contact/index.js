import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { Pool } from "pg";

// Database setup
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  throw new Error("DATABASE_URL must be set");
}

console.log("Connecting to database...");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

// Schema
const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  contactPersonName: text("contact_person_name").notNull(),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  email: text("email").notNull(),
  purposeOfContact: text("purpose_of_contact").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

const db = drizzle(pool, { schema: { contactSubmissions } });

// API handler
export default async function handler(req, res) {
  console.log(`API request: ${req.method} ${req.url}`);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log(`Method not allowed: ${req.method}`);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Parsing request body...');
    const input = insertContactSchema.parse(req.body);
    console.log('Validated input:', input);

    console.log('Inserting into database...');
    const [submission] = await db.insert(contactSubmissions).values(input).returning();
    console.log('Database insertion successful:', submission);

    res.status(201).json(submission);
  } catch (err) {
    console.error('Error in contact API:', err);

    if (err instanceof z.ZodError) {
      console.log('Validation error:', err.errors);
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }

    console.error('Internal server error:', err);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}