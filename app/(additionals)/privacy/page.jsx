export const metadata = {
  title: "Privacy Policy | EV Stay Finder",
  description:
    "Understand how EV Stay Finder collects, uses, and protects your personal information when you visit our website.",
  alternates: {
    canonical: "https://evstayfinder.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>Effective Date: July 23, 2025</p>
      <p>
        At EV Stay Finder, your privacy is important to us. This Privacy Policy
        outlines the types of personal information we collect and how we use it.
      </p>
      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Basic data like browser type, pages visited, and referral URLs.</li>
        <li>Email addresses submitted via contact forms (if any).</li>
      </ul>
      <h2 className="text-xl font-semibold">2. Cookies & Analytics</h2>
      <p>
        We use cookies and Google Analytics to understand how visitors interact
        with the site and improve your experience.
      </p>
      <h2 className="text-xl font-semibold">3. Third-Party Services</h2>
      <p>
        Our site contains affiliate links. These third parties may collect data
        in accordance with their own policies.
      </p>
      <h2 className="text-xl font-semibold">4. Your Choices</h2>
      <p>
        You may disable cookies in your browser settings. Contact us if you have
        questions about your data.
      </p>
    </main>
  );
}
