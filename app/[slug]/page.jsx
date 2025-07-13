import { allCities, allHotels, allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const city = allCities.find((c) => c.slug === params.slug);
  if (!city) return {};

  return {
    title: `${city.title} EV-Friendly Hotels | EVStayFinder`,
    description: `Explore top EV-friendly hotels in ${city.title}. All hotels include EV charging options, perfect for Tesla and other electric vehicles.`,
    keywords: [
      `${city.title} EV hotels`,
      `hotels with EV chargers in ${city.title}`,
      `${city.title} Tesla-friendly hotels`,
      `EV-friendly lodging ${city.title}`,
      `${city.title} hotel EV charging`,
    ],
    alternates: {
      canonical: `https://evstayfinder.vercel.app/${city.slug}`,
    },
    openGraph: {
      title: `${city.title} EV-Friendly Hotels`,
      description: `Top hotels with EV charging in ${city.title}.`,
      url: `https://evstayfinder.vercel.app/${city.slug}`,
      images: [
        {
          url: city.image?.src || "/images/evstayfinder.png",
          width: 1200,
          height: 630,
          alt: `${city.title} EV hotels`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.title} EV-Friendly Hotels`,
      description: `Explore top EV-friendly hotels in ${city.title}.`,
      images: [city.image?.src || "/images/evstayfinder.png"],
    },
  };
}

export default function CityPage({ params }) {
  const city = allCities.find((c) => c.slug === params.slug);
  if (!city) return notFound();

  const hotels = allHotels.filter((h) => h.citySlug === city.slug);
  const relatedBlogs = allBlogs.filter(
    (b) =>
      b.body.raw.toLowerCase().includes(city.title.toLowerCase()) ||
      b.tags?.includes(city.slug)
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.title,
    description: `EV-friendly hotels in ${city.title} with electric vehicle charging stations.`,
    url: `https://evstayfinder.vercel.app/${city.slug}`,
    image: city.image?.src,
    containsPlace: hotels.map((hotel) => ({
      "@type": "Hotel",
      name: hotel.title,
      image: hotel.image?.src,
      url: hotel.affiliateLink,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.title,
        addressCountry: "US",
      },
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://evstayfinder.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: city.title,
          item: `https://evstayfinder.vercel.app/${city.slug}`,
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do hotels in ${city.title} offer Tesla Superchargers?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Many hotels in ${city.title} offer Tesla charging, including universal EV plugs and some Superchargers.`,
        },
      },
      {
        "@type": "Question",
        name: `Is there a fee to use EV charging at hotels in ${city.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Charging policies vary. Some hotels offer free charging for guests, while others charge a flat fee.`,
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemaMarkup)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(faqSchema)}
      </script>

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{city.title} EV-Friendly Hotels</h1>
        <p className="mt-2 text-gray-600">
          Find top-rated EV-charging hotels in {city.title}, perfect for your
          next road trip or Tesla stop.
        </p>

        <div className="pt-4 prose">{city.bodyText}</div>

        <h2 className="text-2xl font-semibold mt-10">
          Top Hotels with EV Charging in {city.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.slug}
              className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={hotel.image.src}
                width={hotel.image.width}
                height={hotel.image.height}
                alt={hotel.title}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{hotel.title}</h3>
                <Link
                  href={hotel.affiliateLink}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="text-blue-600 font-medium mt-2 inline-block"
                >
                  View Hotel →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {relatedBlogs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-4">Related Blog Posts</h2>
            <ul className="space-y-2">
              {relatedBlogs.map((blog) => (
                <li key={blog.slug}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-blue-600 underline"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
