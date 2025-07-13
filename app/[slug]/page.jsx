import { allCities, allHotels, allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronRight,
  FiZap,
  FiBattery,
  FiWifi,
  FiHeart,
  FiDollarSign,
} from "react-icons/fi"; // icons from react-icons
import { FaDog } from "react-icons/fa6";

export async function generateMetadata({ params }) {
  const citySlug = extractCitySlug(params.slug);
  const city = allCities.find((c) => c.slug === citySlug);
  if (!city) return {};

  const prefixTitle = extractSlugPrefix(params.slug);
  const capitalizedPrefix = prefixTitle
    ? prefixTitle
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ")
    : "EV-Friendly Hotels";

  const fullTitle = prefixTitle
    ? `${capitalizedPrefix} in ${city.title}`
    : `${city.title} EV-Friendly Hotels`;

  return {
    title: `${fullTitle} | EVStayFinder`,
    description: prefixTitle
      ? `Explore ${capitalizedPrefix} in ${city.title}. All hotels include EV charging options, perfect for Tesla and other electric vehicles.`
      : `Explore EV-friendly hotels in ${city.title}. All hotels include EV charging options, perfect for Tesla and other electric vehicles.`,
    keywords: [
      `${city.title} EV hotels`,
      `hotels with EV chargers in ${city.title}`,
      `${city.title} Tesla-friendly hotels`,
      `EV-friendly lodging ${city.title}`,
      `${city.title} hotel EV charging`,
    ],
    alternates: {
      canonical: `https://evstayfinder.vercel.app/${params.slug}`,
    },
    openGraph: {
      title: fullTitle,
      description: prefixTitle
        ? `Top ${prefixTitle} in ${city.title}.`
        : `Top EV-friendly hotels in ${city.title}.`,
      url: `https://evstayfinder.vercel.app/${params.slug}`,
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
      title: fullTitle,
      description: prefixTitle
        ? `Explore ${prefixTitle} in ${city.title}.`
        : `Explore EV-friendly hotels in ${city.title}.`,
      images: [city.image?.src || "/images/evstayfinder.png"],
    },
  };
}

function extractCitySlug(fullSlug) {
  const match = fullSlug.match(/-in-(.+)$/);
  return match ? match[1] : fullSlug;
}

function extractSlugPrefix(fullSlug) {
  const match = fullSlug.match(/^(.+)-in-[^/]+$/);
  return match ? match[1].replace(/-/g, " ") : "";
}

export default function CityPage({ params }) {
  const citySlug = extractCitySlug(params.slug);
  const city = allCities.find((c) => c.slug === citySlug);
  if (!city) return notFound();

  const hotels = allHotels.filter((h) => h.citySlug === city.slug);

  const relatedBlogs = allBlogs.filter(
    (b) =>
      b.body.raw.toLowerCase().includes(city.title.toLowerCase()) ||
      b.tags?.includes(city.slug)
  );

  const prefix = extractSlugPrefix(params.slug);
  const capitalizedPrefix =
    prefix.length > 0
      ? prefix
          .split(" ")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" ")
      : "EV-Friendly Hotels";
  // Select icon based on prefix keywords
  let prefixIcon = null;
  if (/tesla/i.test(capitalizedPrefix)) {
    prefixIcon = (
      <FiZap size={30} className="inline-block mr-2 text-[#ff8b94]" />
    );
  } else if (/ev charging/i.test(capitalizedPrefix)) {
    prefixIcon = (
      <FiBattery size={30} className="inline-block mr-2 text-[#ff8b94]" />
    );
  } else if (/pet friendly/i.test(capitalizedPrefix)) {
    prefixIcon = (
      <FaDog size={30} className="inline-block mr-2 text-[#ff8b94]" />
    );
  }
  // Enhanced JSON-LD with @id for linking
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "City",
    "@id": `https://evstayfinder.vercel.app/${params.slug}#city`,
    name: city.title,
    description: `${capitalizedPrefix} in ${city.title} with electric vehicle charging stations.`,
    url: `https://evstayfinder.vercel.app/${params.slug}`,
    image: city.image?.src,
    containsPlace: hotels.map((hotel) => ({
      "@type": "Hotel",
      "@id": hotel.affiliateLink,
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
          item: `https://evstayfinder.vercel.app/${params.slug}`,
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
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schemaMarkup)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(faqSchema)}
      </script>

      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-3xl mr-2">{prefixIcon}</span>
          {capitalizedPrefix} in {city.title}
        </h1>

        <p className="mt-2 text-gray-600">
          Find top-rated EV-charging hotels in {city.title}, perfect for your
          next road trip or Tesla stop.
        </p>

        <article className="pt-4 prose max-w-none">{city.bodyText}</article>

        <section aria-labelledby="top-hotels-heading" className="mt-10">
          <h2 id="top-hotels-heading" className="text-2xl font-semibold mb-6">
            Top Hotels with EV Charging in {city.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.slug}
                className="flex flex-col rounded-2xl bg-white bg-opacity-70 backdrop-blur-sm border border-white/30 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl shadow-inner">
                  <Image
                    src={hotel.image.src}
                    alt={hotel.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col p-6 flex-grow text-gray-900">
                  <h3 className="text-xl font-semibold mb-4 drop-shadow-sm">
                    {hotel.title}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-[#ff8b94]/30 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm text-[#ff8b94] font-medium text-xs select-none">
                      <FiZap className="text-yellow-400" />
                      EV Charging
                    </div>
                    <div className="flex items-center gap-1 bg-[#ff8b94]/30 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm text-green-700 font-medium text-xs select-none">
                      <FiWifi />
                      Free Wifi
                    </div>
                    <div className="flex items-center gap-1 bg-[#ff8b94]/30 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm text-pink-600 font-medium text-xs select-none">
                      <FiHeart />
                      Pet Friendly
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={hotel.affiliateLink}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8b94] bg-opacity-30 backdrop-blur-sm px-4 py-1.5 font-semibold text-black shadow-md hover:bg-opacity-40"
                    aria-label={`View details for ${hotel.title}`}
                  >
                    View Hotel <FiChevronRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {relatedBlogs.length > 0 && (
          <section aria-labelledby="related-blogs-heading" className="mt-16">
            <h2 id="related-blogs-heading" className="text-xl font-bold mb-4">
              Related Blog Posts
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {relatedBlogs.map((blog) => (
                <li key={blog.slug}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-[#ff8b94] underline"
                    aria-label={`Read blog post: ${blog.title}`}
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
