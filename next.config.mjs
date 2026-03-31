/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/resources/:slug",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
