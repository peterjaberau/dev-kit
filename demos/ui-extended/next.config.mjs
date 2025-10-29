/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
// import { codeInspectorPlugin } from 'code-inspector-plugin';

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

    // turbo: {
    //   rules: codeInspectorPlugin({
    //     bundler: 'turbopack',
    //     showSwitch: true,
    //     editor: 'idea',
    //   }),
    // },


  },
  webpack(config) {
    config.resolve.alias['#components'] = path.resolve(__dirname, 'src/components');
    return config;
  },

  // turbopack: {
  //   rules: codeInspectorPlugin({
  //     bundler: 'turbopack',
  //     showSwitch: true,
  //     editor: 'idea'
  //   }),
  // },
}

export default nextConfig
