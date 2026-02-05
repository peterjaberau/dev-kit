/** @type {import('next').NextConfig} */

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    inlineCss: true,
    useCache: true,
    clientSegmentCache: true,
    optimizePackageImports: ["@chakra-ui/react", "@ark-ui/react"],
    externalDir: true,
  },
  output: 'standalone',
}

const withMDX = createMDX({
  // customise the config file path
  configPath: "source.config.ts"
})

initOpenNextCloudflareForDev().catch(console.error);

export default nextConfig
