import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ClientMarquee } from "@/components/ui/marquee"
import { getEntries, Post } from "@/lib/contentful"
import { Entry } from 'contentful'

// Fungsi untuk mengambil data posts
async function getLatestPosts() {
  try {
    const posts = await getEntries({
      order: ['-sys.createdAt'],
      limit: 3
    })
    return posts as Entry<Post>[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white">
        <Image
          src="/assets/XeIEF.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            GDA Consulting
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your trusted partner in geological and environmental consulting services
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-gray-600">
              Stay updated with our latest research, findings, and insights in the field of geological consulting.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post: Entry<Post>) => (
              <Link key={post.sys.id} href={`/blog/${post.fields.slug}`}>
                <div className="group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                  {/* Featured Image */}
                  <div className="relative h-48 w-full bg-gray-100">
                    {post.fields.featuredImage?.fields?.file?.url ? (
                      <Image
                        src={`https:${post.fields.featuredImage.fields.file.url}`}
                        alt={post.fields.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.fields.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {post.fields.description && (
                      <p className="text-gray-700 line-clamp-3">{post.fields.description}</p>
                    )}
                    <div className="mt-4">
                      <span className="text-blue-600 group-hover:text-blue-800 transition-colors">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Marquee Section */}
      <ClientMarquee />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">
              Comprehensive geological and environmental consulting solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Geological Mapping</h3>
              <p className="text-gray-600">Detailed geological surveys and mapping services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Environmental Studies</h3>
              <p className="text-gray-600">Comprehensive environmental impact assessments.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Resource Estimation</h3>
              <p className="text-gray-600">Accurate mineral resource estimation and reporting.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

