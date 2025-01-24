/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s-jc.microlink.io', 'images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's-jc.microlink.io',
        pathname: '/**',
      }
    ],
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  }
}

export default nextConfig
