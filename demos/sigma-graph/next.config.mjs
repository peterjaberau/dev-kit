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
  },
  webpack(config, { isServer }) {
    // Remove Next.js's default svg rule
    config.module.rules = config.module.rules.map((rule) => {
      if (rule?.test?.test?.('.svg')) {
        // Filter out .svg from existing file-loader or asset rules
        return { ...rule, test: /\.(png|jpe?g|gif|webp|avif)$/i };
      }
      return rule;
    });

    // Add SVGR loader for ReactComponent imports
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },

}

export default nextConfig
