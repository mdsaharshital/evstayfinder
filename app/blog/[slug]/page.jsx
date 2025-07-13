// app/blog/[slug]/page.tsx
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function BlogPost({ params }) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <Image
        src={blog.image.src}
        width={blog.image.width}
        height={blog.image.height}
        alt={blog.title}
      />
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <div className="pt-6 prose">{blog.excerpt}</div>
      <div className="pt-6 prose">{blog.bodyText}</div>
    </article>
  );
}
