import { allCities } from "contentlayer/generated";
import Link from "next/link";

const URL = "https://evstayfinder.vercel.app/all-cities"; // define at top-level so both can use

export function generateMetadata() {
  const title = "All EV-Friendly Cities in the US | EVStayFinder";
  const description =
    "Explore all EV-friendly cities with hotels offering electric vehicle charging options across the United States. Find your perfect EV charging hotel in any city.";

  return {
    title,
    description,
    keywords:
      "EV-friendly cities, EV charging hotels, electric vehicle hotels, hotels with EV chargers, EV travel destinations, EV hotels US, electric car hotels",
    alternates: {
      canonical: URL,
    },
    openGraph: {
      title,
      description,
      url: URL,
      siteName: "EVStayFinder",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AllCitiesPage() {
  const sortedCities = allCities.sort((a, b) => a.title.localeCompare(b.title));

  // Use the same URL constant here
  const schemaCities = sortedCities.map((city) => ({
    "@type": "Place",
    name: city.title,
    url: `https://evstayfinder.vercel.app/${city.slug}`,
    description: `Find EV-friendly hotels with charging options in ${city.title}.`,
  }));

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All EV-Friendly Cities in the US",
    description:
      "Comprehensive list of cities across the US with hotels offering electric vehicle charging stations.",
    url: URL,
    itemListElement: schemaCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: city,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          All EV-Friendly Cities in the US
        </h1>

        <p className="mb-8 text-center text-gray-700 max-w-2xl mx-auto">
          Explore every city in the United States where you can find hotels with
          electric vehicle (EV) charging stations. Whether you’re planning a
          road trip or just want to stay in an EV-friendly hotel, this
          comprehensive list has you covered.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sortedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="text-[#ff8b94] text-center hover:underline"
              aria-label={`View EV-friendly hotels in ${city.title}`}
            >
              {city.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
