import type { ImageLoader } from 'next/image'

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  // Untuk gambar lokal, kembalikan path apa adanya
  if (src.startsWith('/')) {
    return src
  }
  // Untuk gambar eksternal, tambahkan parameter
  return src
}

export default imageLoader 