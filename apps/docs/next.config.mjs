import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

// Export the final Next.js config with Nextra included
export default withNextra({
  basePath: '/docs',
  assetPrefix: '/docs',
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
})
