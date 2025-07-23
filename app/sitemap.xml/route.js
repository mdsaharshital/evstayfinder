import { allCities, allBlogs } from "contentlayer/generated";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://evstayfinder.vercel.app";

  // Static Pages
  const staticPages = ["", "about", "contact", "blog"].map(
    (path) =>
      `<url><loc>${baseUrl}/${path}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`
  );

  // City Pages
  const cityPages = allCities.map(
    (city) =>
      `<url><loc>${baseUrl}/${city.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  );

  // Blog Pages
  const blogPages = allBlogs.map(
    (blog) =>
      `<url><loc>${baseUrl}/blog/${blog.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  );

  // Themed prefix-based pages
  const themedPrefixes = [
    "tesla-charger-hotels-in",
    "hotels-with-ev-charging-in",
    "pet-friendly-ev-hotels-in",
  ];

  const themedPages = allCities.flatMap((city) =>
    themedPrefixes.map(
      (prefix) =>
        `<url><loc>${baseUrl}/${prefix}-${city.slug}</loc><changefreq>weekly</changefreq><priority>0.75</priority></url>`
    )
  );

  // Full Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.join("")}
  ${cityPages.join("")}
  ${themedPages.join("")}
  ${blogPages.join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
