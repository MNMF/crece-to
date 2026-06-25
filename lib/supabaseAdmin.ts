import { createClient } from "@supabase/supabase-js";

// Este cliente usa la service_role key y SOLO debe importarse
// desde código que corre en el servidor (rutas /app/api/*).
// Nunca importar este archivo desde un componente de cliente ("use client").
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
