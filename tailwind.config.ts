import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ivory: "#FAF6F0", gold: "#B89352" } } }, plugins: [] };
export default config;