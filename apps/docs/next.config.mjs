import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({})

// Export the final Next.js config with Nextra included
export default withNextra({
  assetPrefix: 'https://docsy-docs.vercel.app',
  basePath: '/docs',
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
})
