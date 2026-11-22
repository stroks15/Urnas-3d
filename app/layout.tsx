import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "NEXTLI · Estudio de Urnas 3D", description: "Diseña un homenaje único para tu compañero." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }