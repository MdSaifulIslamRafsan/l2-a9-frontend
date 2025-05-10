import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
=======
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
>>>>>>> 4f1dbd1d546a5cbf766afd52d3f2571dd4ce2303
  },
};

export default nextConfig;
