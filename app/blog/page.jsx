export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { wisp } from "src/lib/wisp";

// Constants
const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE || "6", 10);

export const metadata = {
  title: "EV-Friendly Hotel Blogs | EV Stay Finder",
  description:
    "Discover in-depth blogs and insights about EV-friendly hotels across the USA. Find your perfect electric vehicle-friendly getaway with expert advice on charging stations, best hotels, and travel tips.",
  alternates: {
    canonical: "https://evstayfinder.vercel.app/blog",
  },
  openGraph: {
    title: "EV-Friendly Hotel Blogs | EV Stay Finder",
    description:
      "Explore expert-written blog posts on EV-compatible hotels and travel tips. Your guide to the best EV-friendly accommodations, charging stations, and more.",
    url: "https://evstayfinder.vercel.app/blog",
    siteName: "EV Stay Finder",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png",
        alt: "EV-friendly hotels and accommodations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV-Friendly Hotel Blogs | EV Stay Finder",
    description:
      "Find the best EV-friendly accommodations and travel insights for your next electric vehicle-friendly trip.",
    images: ["https://evstayfinder.vercel.app/images/evstayfinder.png"],
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    mainEntityOfPage: "https://evstayfinder.vercel.app/blog",
    headline: "EV-Friendly Hotel Blogs",
    description:
      "Read blogs about the best EV-friendly hotels, travel tips, and everything you need for an eco-friendly getaway.",
    author: {
      "@type": "Organization",
      name: "EV Stay Finder",
    },
    publisher: {
      "@type": "Organization",
      name: "EV Stay Finder",
      logo: {
        "@type": "ImageObject",
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png",
      },
    },
    datePublished: "2025-07-23",
    dateModified: "2025-07-23",
    image: "https://evstayfinder.vercel.app/images/evstayfinder.png",
  },
};

export default async function BlogPage() {
  const result = await wisp.getPosts({ limit: POSTS_PER_PAGE });

  return (
    <section className="container max-w-7xl mx-auto mt-16 p-4">
      <BlogStructuredData />

      <h2 className="text-4xl font-bold mb-4 text-[#ff8b94]">Blog Posts</h2>
      <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
        {result.posts.map((post) => (
          <article
            key={post.id}
            className="group rounded-2xl bg-background p-4 shadow-sm hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block relative aspect-[16/9] overflow-hidden rounded-xl"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <img
                  src="https://placehold.co/600x400"
                  alt="Placeholder image"
                  className="w-full h-full object-cover"
                />
              )}
            </Link>
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-semibold leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#ff8b94] hover:text-accent"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-sm text-muted-foreground">
                {format(
                  new Date(post.publishedAt || post.updatedAt),
                  "dd MMMM yyyy"
                )}{" "}
                • {post.tags.map((tag) => tag.name).join(", ")}
              </p>

              <p className="text-base text-foreground/90 line-clamp-3">
                {post.description?.slice(0, 150)}...
              </p>

              <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.name}`}
                    className="hover:text-[#ff8b94]"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlogStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    mainEntityOfPage: "https://evstayfinder.vercel.app/blog",
    headline: "EV-Friendly Hotel Blogs",
    description:
      "Read blogs about the best EV-friendly hotels, travel tips, and everything you need for an eco-friendly getaway.",
    author: {
      "@type": "Organization",
      name: "EV Stay Finder",
    },
    publisher: {
      "@type": "Organization",
      name: "EV Stay Finder",
      logo: {
        "@type": "ImageObject",
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png",
      },
    },
    datePublished: "2025-07-23",
    dateModified: "2025-07-23",
    image: "https://evstayfinder.vercel.app/images/evstayfinder.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
