import { allBlogs } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Constants
const POSTS_PER_PAGE = process.env.POSTS_PER_PAGE;

// Dynamic Metadata with SEO Optimization
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
    image: {
      url: "https://evstayfinder.vercel.app/images/evstayfinder.png", // Default image for OG
      alt: "EV-friendly hotels and accommodations",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "EV-Friendly Hotel Blogs | EV Stay Finder",
    description:
      "Find the best EV-friendly accommodations and travel insights for your next electric vehicle-friendly trip.",
    image: "https://evstayfinder.vercel.app/images/evstayfinder.png",
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
    datePublished: "2025-07-23", // Dynamic if you have post dates
    dateModified: "2025-07-23", // Dynamic if you have post updates
    image: "https://evstayfinder.vercel.app/images/evstayfinder.png",
  },
};

export default function BlogPage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10);
  const selectedTag = searchParams.tag || null;

  const allPublished = allBlogs.filter((blog) => blog.status);
  const allTags = [...new Set(allPublished.flatMap((b) => b.tags))];

  const filtered = selectedTag
    ? allPublished.filter((b) => b.tags.includes(selectedTag))
    : allPublished;

  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  if (!paginated.length && page !== 1) return notFound();

  return (
    <section className="container max-w-7xl mx-auto mt-16 p-4">
      <h2 className="text-xl font-bold mb-4 text-[#ff8b94]">Blog Posts</h2>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TagLink tag={null} selectedTag={selectedTag} />
        {allTags.map((tag) => (
          <TagLink key={tag} tag={tag} selectedTag={selectedTag} />
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
        {paginated.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-10 flex justify-center gap-4">
        {page > 1 && (
          <Link
            href={`/blog?${selectedTag ? `tag=${selectedTag}&` : ""}page=${
              page - 1
            }`}
            className="px-4 py-2 bg-muted rounded"
          >
            ← Previous
          </Link>
        )}
        {page * POSTS_PER_PAGE < filtered.length && (
          <Link
            href={`/blog?${selectedTag ? `tag=${selectedTag}&` : ""}page=${
              page + 1
            }`}
            className="px-4 py-2 bg-[#ff8b94] text-white rounded"
          >
            Load More →
          </Link>
        )}
      </div>
    </section>
  );
}

// Tag Filter Button
function TagLink({ tag, selectedTag }) {
  const isActive = tag === selectedTag || (!tag && selectedTag === null);
  const href = tag ? `/blog?tag=${tag}` : "/blog";

  return (
    <Link
      href={href}
      className={`px-2 py-0.5 rounded-full border text-xs ${
        isActive ? "bg-[#ff8b94] text-white" : "bg-muted"
      }`}
    >
      {tag ? `#${tag}` : "All"}
    </Link>
  );
}

// Blog Card
function BlogCard({ blog }) {
  return (
    <article className="group rounded-2xl bg-background p-4 shadow-sm hover:shadow-lg transition-shadow">
      <Link
        href={`/blog/${blog.slug}`}
        className="block relative aspect-[16/9] overflow-hidden rounded-xl"
      >
        <Image
          src={blog.image?.src || "/default-blog.jpg"}
          width={blog.image?.width || 1200}
          height={blog.image?.height || 675}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-xl font-semibold leading-tight">
          <Link href={`/blog/${blog.slug}`} className="hover:text-accent">
            {blog.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {format(new Date(blog.date), "dd MMMM yyyy")} • {blog.tags.join(", ")}
        </p>
        <p className="mt-2 line-clamp-3 text-base text-foreground/90">
          {blog.excerpt}
        </p>
        <div className="mt-3 text-sm text-muted-foreground space-x-2">
          {blog.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="hover:text-[#ff8b94]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
