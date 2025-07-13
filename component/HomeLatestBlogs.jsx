import Link from "next/link";
import Image from "next/image";

export default function HomeLatestBlogs({ latestBlogs }) {
  return (
    <section aria-labelledby="blogs-heading">
      <h2 id="blogs-heading" className="text-2xl font-bold mb-6">
        Latest Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group block border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition"
          >
            {/* Schema Markup for Blog Post */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: blog.title,
                image: blog.image.src,
                author: {
                  "@type": "Person",
                  name: "Author Name", // Replace with actual author name
                },
                datePublished: blog.datePublished,
                description: blog.excerpt, // Short description of the blog post
                url: `https://evstayfinder.vercel.app/blog/${blog.slug}`,
                mainEntityOfPage: `https://evstayfinder.vercel.app/blog/${blog.slug}`,
              })}
            </script>

            <div className="aspect-video overflow-hidden">
              <Image
                src={blog.image.src}
                width={blog.image.width}
                height={blog.image.height}
                alt={blog.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff8b94]">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
