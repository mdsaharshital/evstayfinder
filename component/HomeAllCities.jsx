import Link from "next/link";
import Image from "next/image";

export default function HomeAllCities({ allCityChunks }) {
  return (
    <section aria-labelledby="cities-heading">
      <h2 id="cities-heading" className="text-2xl font-bold mb-6">
        Explore EV-Friendly Cities
      </h2>
      {allCityChunks.map((cityGroup, index) => (
        <div
          key={`city-group-${index}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
        >
          {cityGroup.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group block border border-gray-200 rounded-xl overflow-hidden
               shadow hover:shadow-md transition mb-2"
            >
              {/* Schema Markup for each City */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Place",
                  name: city.title,
                  description: `Find EV-friendly hotels in ${city.title} with convenient EV charging options.`,
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
                    target: `https://evstayfinder.vercel.app/${city.slug}`,
                    "query-input": "required name=search_term_string",
                  },
                })}
              </script>

              <div className="aspect-video overflow-hidden">
                <Image
                  src={city.image.src}
                  width={city.image.width}
                  height={city.image.height}
                  alt={city.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff8b94]">
                  {city.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
