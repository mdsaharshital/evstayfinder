// next.config.mjs (rare, but possible)
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  reactStrictMode: true,
};

export default withContentlayer(nextConfig);
