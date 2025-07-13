import { allCities, allBlogs } from "contentlayer/generated";
import HomeFAQSection from "component/HomeFAQSection";
import CityCardGridSection from "component/CityCardGridSection";
import ViewAllCitiesLink from "component/ViewAllCitiesLink";

export default function HomePage() {
  const shuffledCities = shuffleArray([...allCities]);

  const bestEvCities = shuffledCities.slice(0, 15);
  const teslaCities = shuffledCities.slice(5, 20);
  const chepCities = shuffledCities.slice(0, 15);

  const schemaOrgMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "EV-Friendly Hotels in Top US Cities",
    url: "https://evstayfinder.vercel.app",
    description:
      "Discover handpicked hotels with EV charging options in the most popular destinations across the U.S.",
    mainEntityOfPage: "https://evstayfinder.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://evstayfinder.vercel.app/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    image: "https://evstayfinder.vercel.app/images/hero-image.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgMarkup) }}
      />
      <main
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16"
        role="main"
        aria-label="Homepage featuring EV friendly hotels in US cities"
      >
        {/* Hero Section */}
        <section
          className="text-center space-y-4"
          aria-labelledby="homepage-hero-title"
        >
          <h1
            id="homepage-hero-title"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            EV-Friendly Hotels in Top US Cities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover handpicked hotels with EV charging options in the most
            popular destinations across the U.S.
          </p>
        </section>

        {/* Themed City Sections */}
        <CityCardGridSection
          title="🔥Tesla Charger Hotels"
          slugPrefix="tesla-charger-hotels-in"
          cities={teslaCities}
        />
        <CityCardGridSection
          title="🔋Hotels with EV Charging"
          slugPrefix="hotels-with-ev-charging-in"
          cities={bestEvCities}
        />
        <CityCardGridSection
          title="🐶Pet‑Friendly EV Hotels"
          slugPrefix="pet-friendly-ev-hotels-in"
          cities={chepCities}
        />

        {/* View All Cities Link */}
        <section
          aria-label="View all cities with EV friendly hotels"
          className="text-center"
        >
          <ViewAllCitiesLink />
        </section>

        {/* FAQ Section */}
        <HomeFAQSection />
      </main>
    </>
  );
}

// Helper: shuffle cities randomly
export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
