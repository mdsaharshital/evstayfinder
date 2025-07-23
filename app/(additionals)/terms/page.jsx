export const metadata = {
  title: "Terms and Conditions | EV Stay Finder",
  description:
    "Read the terms and conditions for using EV Stay Finder's services including user responsibilities and website use.",
  alternates: {
    canonical: "https://evstayfinder.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Terms & Conditions</h1>
      <p>Last updated: July 23, 2025</p>
      <p>
        Welcome to EV Stay Finder. By accessing or using our website at{" "}
        <a
          href="https://evstayfinder.vercel.app"
          className="text-blue-600 underline"
        >
          evstayfinder.vercel.app
        </a>
        , you agree to be bound by these Terms and Conditions.
      </p>
      <h2 className="text-xl font-semibold">1. Use of the Website</h2>
      <p>
        You may use this site for personal and non-commercial purposes only.
        Unauthorized use or duplication of content without written permission is
        prohibited.
      </p>
      <h2 className="text-xl font-semibold">2. Affiliate Disclosure</h2>
      <p>
        EV Stay Finder may earn a commission when you book hotels or use
        services through affiliate links. These links do not affect the price
        you pay.
      </p>
      <h2 className="text-xl font-semibold">3. Limitation of Liability</h2>
      <p>
        We are not responsible for any damages resulting from use of this
        website or affiliate services.
      </p>
      <h2 className="text-xl font-semibold">4. Modifications</h2>
      <p>
        We may update these terms at any time. Continued use of the site means
        you accept the new terms.
      </p>
    </main>
  );
}
