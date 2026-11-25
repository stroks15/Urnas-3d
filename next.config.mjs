const nextConfig = {
  output: process.env.CAPACITOR_BUILD === "true" ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["three"],
};

export default nextConfig;
