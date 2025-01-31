import type { ImageLoader } from 'next/image'

export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  if (src.startsWith('https://s-jc.microlink.io')) {
    return src
  }
  return `${src}?w=${width}&q=${quality || 75}`
} 