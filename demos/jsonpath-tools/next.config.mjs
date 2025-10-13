/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    inlineCss: true,
    useCache: true,
    clientSegmentCache: true,
    optimizePackageImports: ["@chakra-ui/react", "@ark-ui/react"],
    externalDir: true,
    turbo: {
      rules: {
        // Treat .md as text
        "*.md": {
          loaders: ["text"],
          as: "text",
        },
      },
    },
  },



}

export default nextConfig
