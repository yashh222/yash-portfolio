import { Router } from "express";
import { z } from "zod";
import { saveContactToSupabase } from "../lib/supabase.js";

const router = Router();

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

router.post("/", async (req, res) => {
  try {
    const data = schema.parse(req.body);

    await saveContactToSupabase(data);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error(err);

    const message = err instanceof z.ZodError
      ? "Please provide a valid name, email, and message."
      : err instanceof Error
        ? err.message
        : "Unable to send your message right now.";

    return res.status(err instanceof z.ZodError ? 400 : 500).json({
      success: false,
      error: message,
    });
  }
});

export default router;