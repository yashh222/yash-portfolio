import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function saveContactToSupabase({ name, email, message }) {
  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) throw error;
}