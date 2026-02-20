/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}
export default nextConfig
