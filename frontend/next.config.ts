import type { NextConfig } from "next";

const apiProtocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;
const apiPort = process.env.NEXT_PUBLIC_API_PORT;

if (!apiProtocol || !apiHostname || !apiPort) {
  throw new Error(
    "API configuration is missing. Please check your .env.local file for NEXT_PUBLIC_API_PROTOCOL, NEXT_PUBLIC_API_HOSTNAME, and NEXT_PUBLIC_API_PORT."
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Use the validated variables from your .env file here
        protocol: apiProtocol as "http" | "https",
        hostname: apiHostname,
        port: apiPort,
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
