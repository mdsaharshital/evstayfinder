import Link from "next/link";
import Image from "next/image";

const footerMenus = [
  {
    title: "Tesla Charger Hotels",
    slugPrefix: "tesla-charger-hotels-in",
  },
  {
    title: "Hotels with EV Charging",
    slugPrefix: "hotels-with-ev-charging-in",
  },
  {
    title: "Pet‑Friendly EV Hotels",
    slugPrefix: "pet-friendly-ev-hotels-in",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/evstayfinder.png"
              alt="EVStayFinder Logo"
              width={36}
              height={36}
            />
            <span className="text-lg font-bold text-[#ff8b94]">
              EVStayFinder
            </span>
          </Link>
          <p className="text-gray-600 text-sm mt-3">
            Discover EV-friendly hotels across cities. Reliable, clean, and
            powered for your journey.
          </p>
        </div>

        {/* Main Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {footerMenus.map((menu) => (
              <li key={menu.slugPrefix}>
                <Link
                  href={`/${menu.slugPrefix}-new-york-city`} // example route
                  className="hover:text-[#ff8b94] transition"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-[#ff8b94] transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#ff8b94] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">
            Follow us
          </h4>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#ff8b94]"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 19c7.732 0 11.964-6.412 11.964-11.964 0-.182 0-.364-.013-.544A8.556 8.556 0 0022 4.57a8.36 8.36 0 01-2.356.646A4.12 4.12 0 0021.448 3.1a8.269 8.269 0 01-2.607.996A4.107 4.107 0 0015.45 3c-2.27 0-4.107 1.837-4.107 4.107 0 .322.036.636.106.935A11.655 11.655 0 013 4.893a4.102 4.102 0 001.27 5.477A4.082 4.082 0 012.8 9.6v.052c0 2.047 1.457 3.756 3.393 4.146a4.1 4.1 0 01-1.085.144c-.265 0-.523-.026-.774-.075.523 1.633 2.04 2.823 3.834 2.857A8.238 8.238 0 012 18.407a11.616 11.616 0 006.29 1.843" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#ff8b94]"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.14 8.44 9.88v-6.99H7.9v-2.89h2.54V9.75c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34V22c4.78-.74 8.44-4.88 8.44-9.93z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EVStayFinder. All rights reserved.
      </div>
    </footer>
  );
}
