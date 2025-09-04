import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Experimental features optimizations
  experimental: {
    // Disable turbopack for stability
    turbo: undefined,
    // Memory optimization
    optimizePackageImports: ["lucide-react", "recharts", "d3"],
  },

  // Development optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Webpack optimizations
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file watching polling for better performance
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
