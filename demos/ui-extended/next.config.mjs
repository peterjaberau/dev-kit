/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


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
  webpack(config) {
    config.resolve.alias['#components'] = path.resolve(__dirname, 'src/components');
    return config;
  },
}

export default nextConfig
