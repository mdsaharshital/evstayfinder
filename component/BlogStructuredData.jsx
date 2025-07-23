import { Fragment } from "react";

export function BlogStructuredData({ blog }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.date,
    author: {
      "@type": "Organization",
      name: "Evstayfinder",
    },
    image: blog.image?.src,
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
