import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? '/wait-again' : '',
  assetPrefix: isGitHubPages ? '/wait-again/' : '',
  images: { unoptimized: true },
};

export default nextConfig;
