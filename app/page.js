import { allCities, allBlogs } from "contentlayer/generated";
import HomeFAQSection from "component/HomeFAQSection";
import HomeLatestBlogs from "component/HomeLatestBlogs";
import HomeAllCities from "component/HomeAllCities";

export default function HomePage() {
  const allCityChunks = chunkArray(allCities, 10); // Two sections of 10 cities
  const latestBlogs = allBlogs.slice(0, 3);

  const schemaOrgMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "EV-Friendly Hotels in Top US Cities",
    url: "https://evstayfinder.vercel.app", // Replace with your site URL
    description:
      "Discover handpicked hotels with EV charging options in the most popular destinations across the U.S.",
    mainEntityOfPage: "https://evstayfinder.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://evstayfinder.vercel.app/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    image: "https://evstayfinder.vercel.app/images/hero-image.jpg", // Use your hero image URL
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgMarkup)}
      </script>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            EV-Friendly Hotels in Top US Cities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover handpicked hotels with EV charging options in the most
            popular destinations across the U.S.
          </p>
        </section>

        {/* All Cities (Two Visual Styles: Popular and More EV-Friendly Cities) */}
        <HomeAllCities allCityChunks={allCityChunks} />
        {/* Latest Blog Posts */}
        {/* <HomeLatestBlogs latestBlogs={latestBlogs} /> */}
        {/* FAQ Section */}
        <HomeFAQSection />
      </main>
    </>
  );
}

// Helper function to chunk cities into groups
function chunkArray(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}
