// File: app/disclaimer/page.jsx
export const metadata = {
  title: "Affiliate Disclaimer | EV Stay Finder",
  description:
    "Disclosure about affiliate links and earnings from EV Stay Finder's hotel and travel recommendations.",
  alternates: {
    canonical: "https://evstayfinder.vercel.app/disclaimer",
  },
};
export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <p className="mb-4">Last updated: July 23, 2025</p>

      <p className="mb-4">
        The information provided by EVStayFinder ("we," "us," or "our") on
        https://evstayfinder.vercel.app is for general informational purposes
        only. All information on the Site is provided in good faith; however, we
        make no representation or warranty of any kind regarding accuracy or
        completeness.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Affiliate Disclaimer</h2>
      <p className="mb-4">
        EVStayFinder may contain links to affiliate websites, and we may earn a
        commission if you make a purchase or booking through these links. These
        commissions help us maintain the site and offer free content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        External Links Disclaimer
      </h2>
      <p className="mb-4">
        The website may contain links to other websites or content belonging to
        or originating from third parties. We do not investigate, monitor, or
        check such external links for accuracy or reliability.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Professional Advice Disclaimer
      </h2>
      <p className="mb-4">
        The Site cannot and does not contain travel or legal advice. All
        information is provided for general informational and educational
        purposes only.
      </p>
    </main>
  );
}
