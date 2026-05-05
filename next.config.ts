import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS === "true" &&
  process.env.GITHUB_REPOSITORY === "anirvanvinod/omni-brief";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/omni-brief" : undefined,
  assetPrefix: isGithubPages ? "/omni-brief/" : undefined,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
