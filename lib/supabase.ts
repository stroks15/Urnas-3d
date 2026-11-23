import {createClient} from "@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL||"https://supabase.co";
const anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"public-anon-key-not-configured";
export const supabase=createClient(url,anon,{auth:{persistSession:true,autoRefreshToken:true}});
export const supabaseConfigured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function saveDesign(title:string,design:Record<string,unknown>){if(!supabaseConfigured)return {ok:false,message:"Configura las variables públicas de Supabase en Vercel."};let {data:{user}}=await supabase.auth.getUser();if(!user){const auth=await supabase.auth.signInAnonymously();if(auth.error)return {ok:false,message:"Activa el acceso anónimo en Supabase: "+auth.error.message};user=auth.data.user}if(!user)return {ok:false,message:"No se pudo crear la sesión de guardado."};const {error}=await supabase.from("urn_designs").insert({owner_id:user.id,title,design});if(error)return {ok:false,message:error.message};return {ok:true,message:"Diseño respaldado en Supabase."};}
