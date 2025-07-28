// next.config.mjs (rare, but possible)
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",

        search: "",
      },
    ],
  },
};

export default withContentlayer(nextConfig);
