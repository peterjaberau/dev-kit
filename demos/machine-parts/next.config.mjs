/** @type {import('next').NextConfig} */

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    inlineCss: true,
    useCache: true,
    clientSegmentCache: true,
    optimizePackageImports: ["@chakra-ui/react", "@ark-ui/react"],
    externalDir: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "oud.pics",
      },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
}

initOpenNextCloudflareForDev().catch(console.error);

export default nextConfig
