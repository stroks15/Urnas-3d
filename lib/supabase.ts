import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const supabaseConfigured = Boolean(url && anon);

let client: SupabaseClient | null = null;

/** Created on demand: a missing or malformed variable must never break the build or the 3D studio. */
function getClient() {
  if (!client) client = createClient(url!, anon!, { auth: { persistSession: true, autoRefreshToken: true } });
  return client;
}

export async function saveDesign(title: string, design: Record<string, unknown>) {
  if (!supabaseConfigured) return { ok: false, message: "El guardado en la nube no está configurado (variables públicas de Supabase)." };
  try {
    const supabase = getClient();
    const { data: session } = await supabase.auth.getSession();
    let user = session.session?.user ?? null;
    if (!user) {
      const auth = await supabase.auth.signInAnonymously();
      if (auth.error) return { ok: false, message: "Activa el acceso anónimo en Supabase: " + auth.error.message };
      user = auth.data.user;
    }
    if (!user) return { ok: false, message: "No se pudo crear la sesión de guardado." };
    const { error } = await supabase.from("urn_designs").insert({ owner_id: user.id, title, design });
    if (error) return { ok: false, message: error.message };
    return { ok: true, message: "Diseño respaldado en Supabase." };
  } catch (error) {
    return { ok: false, message: "No se pudo guardar: " + (error instanceof Error ? error.message : "revisa tu conexión") };
  }
}
