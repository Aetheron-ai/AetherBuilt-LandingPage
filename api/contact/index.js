import "dotenv/config";
import { storage } from "../../server/storage.js";
import { api } from "../../shared/routes.js";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const input = api.contact.create.input.parse(req.body);
    const submission = await storage.createContactSubmission(input);
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