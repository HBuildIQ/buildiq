import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://sysdgjhtwuoatinjfieo.supabase.co";

const supabaseKey =
  "sb_publishable_rzpxGjFn70i7zbv4KzjGkA_ABxBPdvJ";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)