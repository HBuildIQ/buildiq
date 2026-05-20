import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://sysdgjhtwuoatinjfieo.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5c2Rnamh0d3VvYXRpbmpmaWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4ODMyODMsImV4cCI6MjA5NDQ1OTI4M30.PQe702H7IcANch11OqqXHoFUb6gCO670HtSHZKbp53E";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);