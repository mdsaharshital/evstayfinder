export const metadata = {
  title: "Contact Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
  description:
    "Get in touch with EV Stay Finder for inquiries, support, and feedback. We're here to help you plan your EV-friendly travel and road trips across the USA.",
  openGraph: {
    title: "Contact Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
    description:
      "Reach out to EV Stay Finder for any questions about EV-friendly accommodations, travel tips, or our platform. We're committed to supporting your electric vehicle road trip planning.",
    url: "https://evstayfinder.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "/images/aboutPagePhoto.jpg", // Placeholder image
        width: 1200,
        height: 630,
        alt: "EV Stay Finder - Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | EV Stay Finder - Your Guide to EV-Friendly Hotels",
    description:
      "Have any questions? Get in touch with EV Stay Finder for assistance with your EV-friendly travel plans and hotel bookings.",
    image: "/images/aboutPagePhoto.jpg", // Placeholder image
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-7xl mx-auto p-6">
      {/* Contact Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help you with all things related to EV-friendly hotels
          and electric vehicle road trips.
        </p>
      </header>

      {/* Contact Information */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Contact Details</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Feel free to reach out to us via the form or the contact details
          below.
        </p>
        <ul className="space-y-4">
          <li className="text-lg text-muted-foreground">
            <strong>Phone:</strong> +1 800-123-4567
          </li>
          <li className="text-lg text-muted-foreground">
            <strong>Email:</strong> support@evstayfinder.com
          </li>
          <li className="text-lg text-muted-foreground">
            <strong>Office:</strong> 123 EV Road, San Francisco, CA 94103
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <p className="text-lg text-muted-foreground mb-6">
          Have questions or need help with your EV travel plans? We're happy to
          assist you.
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
