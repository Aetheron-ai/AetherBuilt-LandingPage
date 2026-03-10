import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import pg from "pg";
import { Pool } from "pg";

// Database setup
const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const input = insertContactSchema.parse(req.body);
    const [submission] = await db.insert(contactSubmissions).values(input).returning();
    res.status(201).json(submission);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}