// app/blog/[slug]/page.jsx
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlogStructuredData } from "component/BlogStructuredData";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  const fullUrl = `https://evstayfinder.vercel.app/blog/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: fullUrl,
      type: "article",
      images: [
        {
          url: blog.image?.src || "/images/evstayfinder.png",
          width: blog.image?.width || 1200,
          height: blog.image?.height || 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      image: blog.image?.src || "/images/evstayfinder.png",
    },
  };
}

export default function BlogPost({ params }) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto p-6">
      {/* Blog Structured Data */}
      <BlogStructuredData blog={blog} />

      {/* Main Image */}
      <Image
        src={blog.image.src}
        width={blog.image.width}
        height={blog.image.height}
        alt={blog.title}
        className="rounded-xl object-cover mb-6"
      />

      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-primary mt-4">{blog.title}</h1>

      {/* Publication Date and Tags */}
      <div className="text-sm text-muted-foreground mt-2">
        <p>Published on {formattedDate}</p>
        <div className="mt-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-[#ff8b94] text-white text-xs px-2 py-1 rounded-full mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Excerpt */}
      <div className="prose pt-6 text-muted-foreground">{blog.excerpt}</div>

      {/* Full Blog Content */}
      <div
        className="prose pt-6 text-foreground"
        dangerouslySetInnerHTML={{ __html: blog.bodyText }}
      />

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-[#ff8b94] text-white rounded-xl">
        <p className="text-center">
          Interested in more tips and strategies? Check out our other blogs!
        </p>
        <div className="text-center mt-3">
          <Link
            href="/blog"
            className="inline-block underline px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all"
          >
            Explore More Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
