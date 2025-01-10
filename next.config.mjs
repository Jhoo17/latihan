/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    unoptimized: true
  }
}

export default nextConfig
