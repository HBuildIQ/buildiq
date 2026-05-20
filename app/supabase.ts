import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://sysdgjhtwuoatinjfieo.supabase.co";

const supabaseKey =
anon public key
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);