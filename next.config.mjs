import { resolve } from "path";

const nextConfig = {
  webpack: (config) => {
    // Add a fallback for the "node:" scheme
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      util: "util",
    };

    // Alias "node:" modules without the prefix
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:stream": "stream-browserify",
      "node:crypto": "crypto-browserify",
      "node:util": "util",
    };

    return config;
  },
};

export default nextConfig;
