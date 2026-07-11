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
      message: "Saved successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;