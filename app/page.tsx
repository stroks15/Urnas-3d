"use client";
import React from "react";
import dynamic from "next/dynamic";
const Studio=dynamic(()=>import("@/components/studio"),{ssr:false,loading:()=><main className="loading"><div className="spinner"/>Preparando estudio 3D…</main>});
class AppBoundary extends React.Component<{children:React.ReactNode},{error:string|null}>{
  state={error:null as string|null};
  static getDerivedStateFromError(error:Error){return {error:error?.message||"Error inesperado al iniciar el configurador."};}
  componentDidCatch(error:Error,info:React.ErrorInfo){console.error("NEXTLI_STUDIO_RENDER_ERROR",error,info.componentStack);}
  render(){if(this.state.error)return <main style={{minHeight:"100dvh",background:"#0b0e14",color:"#eef4fa",display:"grid",placeItems:"center",padding:24,fontFamily:"system-ui"}}><section style={{maxWidth:520,width:"100%",background:"#131722",border:"1px solid #334155",borderRadius:18,padding:24}}><h1 style={{fontSize:22,fontWeight:700}}>No se pudo iniciar el estudio 3D</h1><p style={{color:"#aab6c5",lineHeight:1.5}}>La interfaz detectó un error y evitó que la aplicación quedara en blanco. Recarga la página; si continúa, comparte este mensaje con soporte.</p><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",background:"#090c12",padding:12,borderRadius:10,color:"#ffb4a9",fontSize:12}}>{this.state.error}</pre><button onClick={()=>location.reload()} style={{marginTop:12,minHeight:48,padding:"0 18px",borderRadius:10,background:"#00d9ee",color:"#061018",fontWeight:700}}>Recargar aplicación</button></section></main>;return this.props.children;}
}
export default function Page(){return <AppBoundary><Studio/></AppBoundary>}
