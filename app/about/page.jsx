import Image from "next/image";

export const metadata = {
  title: "About Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
  description:
    "Learn more about EV Stay Finder, your trusted platform for discovering EV-friendly hotels across the USA. Plan your next road trip with confidence knowing your accommodation is equipped for your electric vehicle.",
  openGraph: {
    title: "About Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
    description:
      "EV Stay Finder helps you find the best EV-friendly hotels across the USA, making your road trip planning easier and more convenient. Learn more about our mission and how we are transforming travel for EV owners.",
    url: "https://evstayfinder.vercel.app/about",
    type: "website",
    images: [
      {
        url: "/images/about-ev-stay-finder.jpg", // Placeholder image
        width: 1200,
        height: 630,
        alt: "EV Stay Finder - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
    description:
      "Discover more about EV Stay Finder and how we make finding EV-friendly hotels easier for your electric vehicle road trips.",
    image: "/images/about-ev-stay-finder.jpg", // Placeholder image
  },
};

export default function AboutPage() {
  return (
    <article className="max-w-7xl mx-auto p-6">
      {/* About Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          About EV Stay Finder
        </h1>
        <p className="text-lg text-muted-foreground">
          Your guide to the best EV-friendly hotels across the USA. Plan your
          trips with peace of mind, knowing that every stop on your journey
          offers the charging options you need.
        </p>
      </header>

      {/* About Content */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-4">
          At EV Stay Finder, we are dedicated to helping electric vehicle (EV)
          owners find hotels that are compatible with their EV charging needs.
          As the number of electric vehicles grows, so does the need for
          convenient, accessible, and reliable charging stations. Our mission is
          to make it easier for travelers to find accommodations that are
          equipped to charge their EVs while they rest.
        </p>
        <p className="text-lg text-muted-foreground">
          Whether you're on a long road trip or looking for a weekend getaway,
          EV Stay Finder is here to ensure that your stay is as smooth as your
          drive. We aim to be the most comprehensive and trusted source for
          EV-friendly hotel listings in the USA.
        </p>
      </section>

      {/* Image Section */}
      <section className="mb-12">
        <div className="relative w-full h-80">
          <Image
            src="/images/aboutPagePhoto.jpg" // Placeholder image
            alt="EV Road Trip"
            layout="fill"
            className="object-cover rounded-lg"
          />
        </div>
        <p className="mt-4 text-center text-muted-foreground">
          Our platform makes it easy to plan your EV road trip, ensuring you're
          never far from the nearest charging station.
        </p>
      </section>

      {/* Values and Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Why Choose EV Stay Finder?
        </h2>
        <ul className="list-disc pl-6 space-y-4">
          <li className="text-lg text-muted-foreground">
            Comprehensive directory of EV-friendly hotels, including Tesla
            chargers, general EV chargers, and more.
          </li>
          <li className="text-lg text-muted-foreground">
            Easily find locations based on city, region, and charging
            preferences.
          </li>
          <li className="text-lg text-muted-foreground">
            User reviews and ratings for each hotel, helping you make informed
            decisions about your stay.
          </li>
          <li className="text-lg text-muted-foreground">
            Up-to-date information on available EV charging stations at each
            hotel.
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Join the EV Revolution</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Ready to hit the road with your electric vehicle? Explore our
          directory and start planning your EV-friendly road trip today.
        </p>
        <a
          href="/blog"
          className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all"
        >
          Explore Our Blog for EV Travel Tips
        </a>
      </section>
    </article>
  );
}
