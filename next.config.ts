import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
=======
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
>>>>>>> 2653b6c371562628394fbba5588814a2b62ab48d
  },
};

export default nextConfig;
