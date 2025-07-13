import Link from "next/link";
import Image from "next/image";

export default function CityCardGridSection({ title, cities, slugPrefix }) {
  // Structured data for all cities in this section (Place + BreadcrumbList for SEO)
  const citiesSchema = cities.map((city, idx) => ({
    "@type": "Place",
    name: city.title,
    description: `${title} in ${city.title} with convenient EV charging options.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.title,
      addressCountry: "US",
    },
    image: city.image.src,
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.latitude,
      longitude: city.longitude,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `https://evstayfinder.vercel.app/${slugPrefix}-${city.slug}`,
      "query-input": "required name=search_term_string",
    },
    url: `https://evstayfinder.vercel.app/${slugPrefix}-${city.slug}`,
  }));

  // Breadcrumb structured data (important SEO for internal linking & Google SERP)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cities.map((city, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: city.title,
      item: `https://evstayfinder.vercel.app/${slugPrefix}-${city.slug}`,
    })),
  };

  return (
    <section
      className="space-y-6 mb-20"
      role="region"
      aria-labelledby={`${slugPrefix}-section`}
    >
      <h2
        id={`${slugPrefix}-section`}
        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900"
      >
        {title}
      </h2>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, ...citiesSchema],
          }),
        }}
      />

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
      >
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${slugPrefix}-${city.slug}`}
            aria-label={`View EV-friendly hotels in ${city.title}`}
            className="
              group
              block
              border
              border-gray-200
              rounded-lg
              overflow-hidden
              shadow-sm
              hover:shadow-lg
              transition
              duration-300
              ease-in-out
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#ff8b94]
            "
          >
            <div className="aspect-video overflow-hidden bg-gray-100">
              <Image
                src={city.image.src}
                width={city.image.width}
                height={city.image.height}
                alt={`EV-friendly hotels in ${city.title}`}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff8b94] transition-colors duration-300">
                {city.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
