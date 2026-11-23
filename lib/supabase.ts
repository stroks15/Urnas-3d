import { createClient } from "@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL||"https://supabase.co";
const anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"public-anon-key-not-configured";
export const supabase=createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
export const supabaseConfigured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function saveDesign(design:Record<string,unknown>){if(!supabaseConfigured)return {ok:false,message:"Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para activar el respaldo."};const {error}=await supabase.from("urn_designs").insert({design});if(error)return {ok:false,message:error.message};return {ok:true,message:"Diseño respaldado en Supabase."};}
