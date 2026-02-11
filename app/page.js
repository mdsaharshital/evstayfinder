// app/page.jsx
import { allCities, allBlogs } from "contentlayer/generated";
import HomeFAQSection from "component/HomeFAQSection";
import CityCardGridSection from "component/CityCardGridSection";
import ViewAllCitiesLink from "component/ViewAllCitiesLink";
import Link from "next/link";
import HomeLatestBlogs from "component/HomeLatestBlogs";

export const metadata = {
  title: "EV-Friendly Hotels in the USA | Find Tesla & EV Charging Hotels",
  description:
    "Explore top U.S. cities with EV-friendly hotels offering Tesla and universal charging stations. Compare and book the best EV hotel stays today.",
  keywords: [
    "EV hotels USA",
    "Tesla charger hotels",
    "hotels with EV charging",
    "EV-friendly hotels",
    "pet-friendly EV hotels",
    "Tesla-friendly accommodations",
    "electric vehicle hotel directory",
    "EV stay finder",
  ],
  openGraph: {
    title: "EV-Friendly Hotels in the USA | Tesla & EV Charger Hotels",
    description:
      "Discover EV-friendly hotels in major US cities with charging stations for Tesla and other electric vehicles.",
    url: "https://evstayfinder.vercel.app",
    siteName: "EV Stay Finder",
    images: [
      {
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png",
        width: 1200,
        height: 630,
        alt: "EV Charging Hotel Map USA",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://evstayfinder.vercel.app",
  },
};

export default function HomePage() {
  const shuffledCities = shuffleArray([...allCities]);
  const bestEvCities = shuffledCities.slice(0, 15);
  const teslaCities = shuffledCities.slice(5, 20);
  const petCities = shuffledCities.slice(10, 25);
  const latestBlogs = allBlogs.slice(0, 4);

  const schemaOrgMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EV Stay Finder",
    url: "https://evstayfinder.vercel.app",
    description:
      "Find and compare EV-friendly hotels with Tesla and electric vehicle charging stations in cities across the U.S.",
    publisher: {
      "@type": "Organization",
      name: "EV Stay Finder",
      url: "https://evstayfinder.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://evstayfinder.vercel.app/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            EV-Friendly Hotels with Charging Stations Across the USA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and compare Tesla charger hotels and EV-friendly accommodations
            in top U.S. cities. Travel sustainably and charge on the go.
          </p>
        </section>

        {/* Quick Links */}
        <div className="text-center mt-6">
          <p>
            Popular:{" "}
            <Link
              href="/tesla-charger-hotels-in-los-angeles"
              className="underline text-blue-600"
            >
              Tesla Hotels in Los Angeles
            </Link>{" "}
            |{" "}
            <Link
              href="/hotels-with-ev-charging-in-miami"
              className="underline text-blue-600"
            >
              EV Hotels in Miami
            </Link>
          </p>
        </div>

        {/* Themed City Sections */}
        <CityCardGridSection
          title="🔥 Tesla Charger Hotels"
          slugPrefix="tesla-charger-hotels-in"
          cities={teslaCities}
        />
        <CityCardGridSection
          title="🔋 Hotels with EV Charging"
          slugPrefix="hotels-with-ev-charging-in"
          cities={bestEvCities}
        />
        <CityCardGridSection
          title="🐶 Pet‑Friendly EV Hotels"
          slugPrefix="pet-friendly-ev-hotels-in"
          cities={petCities}
        />

        {/* View All Cities Link */}
        <section
          aria-label="View all cities with EV friendly hotels"
          className="text-center "
        >
          <ViewAllCitiesLink />
        </section>

        {/* Blog Section */}
        <HomeLatestBlogs latestBlogs={latestBlogs} />
        {/* FAQ Section */}
        <HomeFAQSection />
      </main>
    </>
  );
}

// Shuffle Helper
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
