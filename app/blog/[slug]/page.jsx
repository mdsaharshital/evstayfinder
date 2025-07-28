import Link from "next/link";
import { wisp } from "src/lib/wisp";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export function BlogStructuredData({ blog }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.publishedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: "Evstayfinder",
    },
    image:
      blog.image?.url ||
      "https://evstayfinder.vercel.app/images/evstayfinder.png",
    description: blog.excerpt,
    url: `https://evstayfinder.vercel.app/blog/${blog.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export async function generateMetadata({ params }) {
  const result = await wisp.getPost(params.slug);
  const post = result?.post;
  if (!post) return notFound();

  const fullUrl = `https://evstayfinder.vercel.app/blog/${params.slug}`;
  const imageUrl = post.image?.url || "/images/evstayfinder.png";

  return {
    title: post.title,
    description: post.excerpt || post.description,
    keywords: [
      ...post.tags.map((tag) => tag.name),
      "EV travel USA",
      "electric car hotels",
      "Tesla charging hotels",
      "EV road trip tips",
      post.title,
    ],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description,
      url: fullUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }) {
  const result = await wisp.getPost(params.slug);
  if (!result?.post) return notFound();
  console.log(result);

  const { title, publishedAt, createdAt, content, tags, excerpt, image } =
    result.post;

  const formattedDate = new Date(publishedAt || createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="max-w-3xl mx-auto p-6">
      {/* Blog Structured Data */}
      <BlogStructuredData blog={result.post} />

      {/* Main Image */}
      {image?.url && (
        <Image
          fill
          src={image.url}
          alt={title}
          className="rounded-xl object-cover mb-6 w-full"
          width={image.width || 1200}
          height={image.height || 630}
        />
      )}

      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-primary mt-4">{title}</h1>

      {/* Date & Tags */}
      <div className="text-sm text-muted-foreground mt-2">
        <p>Published on {formattedDate}</p>
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="inline-block bg-[#ff8b94] text-white text-xs px-2 py-1 rounded-full mr-2"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="prose pt-6 text-muted-foreground">{excerpt}</div>
      )}

      {/* Blog Body */}
      <div
        className="prose pt-6 text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* CTA */}
      <div className="mt-6 p-4 bg-[#ff8b94] text-white rounded-xl">
        <p className="text-center">
          Want more EV travel insights? Browse our latest blogs to stay ahead!
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
