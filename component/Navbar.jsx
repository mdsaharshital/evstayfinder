"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { allCities } from "contentlayer/generated";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(0);
  const buttonRefs = useRef({});

  const sortedCities = [...allCities].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const cityMenuItems = [
    {
      title: "🔥 Tesla Charger Hotels",
      slugPrefix: "tesla-charger-hotels-in",
      icon: "⚡",
      cities: sortedCities,
    },
    {
      title: "🔋 Hotels with EV Charging",
      slugPrefix: "hotels-with-ev-charging-in",
      icon: "🔌",
      cities: sortedCities,
    },
    {
      title: "🐶 Pet‑Friendly EV Hotels",
      slugPrefix: "pet-friendly-ev-hotels-in",
      icon: "🐾",
      cities: sortedCities,
    },
  ];

  const currentMenu = cityMenuItems.find((m) => m.title === hoveredMenu);

  const handleMouseEnter = (title) => {
    setHoveredMenu(title);
    const button = buttonRefs.current[title];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition(rect.left + rect.width / 2);
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md border-b border-gray-200 shadow-sm"
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/evstayfinder.png"
            alt="EVStayFinder Logo"
            width={36}
            height={36}
          />
          <span className="font-bold text-xl text-[#ff8b94] select-none">
            EVStayFinder
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 relative">
          {cityMenuItems.map((item) => (
            <button
              key={item.title}
              ref={(el) => (buttonRefs.current[item.title] = el)}
              onMouseEnter={() => handleMouseEnter(item.title)}
              className={`font-semibold text-gray-700 hover:text-[#ff8b94] transition-colors`}
            >
              {item.title}
            </button>
          ))}
          <Link
            href="/about"
            className="font-semibold text-gray-700 hover:text-[#ff8b94]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-semibold text-gray-700 hover:text-[#ff8b94]"
          >
            Contact
          </Link>
        </div>
        {/* Mobile Menu Toggle (Hamburger Icon) */}
        <div className="md:hidden">
          <MobileMenu cityMenuItems={cityMenuItems} />
        </div>
      </div>

      {/* Dropdown (Desktop Only) */}
      {currentMenu && (
        <div
          className="hidden md:block absolute z-40 "
          style={{
            left: dropdownPosition,
            transform: "translateX(-50%)",
          }}
        >
          <div className="mt-2 w-[min(700px,90vw)] transition-all duration-200 ease-out transform bg-white rounded-xl border border-gray-200 shadow-lg opacity-100 animate-fade-in translate-y-1">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 max-h-[300px] overflow-y-auto">
              {currentMenu.cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${currentMenu.slugPrefix}-${city.slug}`}
                    className="block px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-blue-50 hover:text-[#ff8b94] transition"
                    onClick={() => setHoveredMenu(null)}
                  >
                    {city.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
function MobileMenu({ cityMenuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (title) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setOpenSubMenu(null);
        }}
        className="p-2 rounded-md text-gray-700 hover:text-[#ff8b94] focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <div className="absolute top-full inset-x-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <nav className="flex flex-col p-4 space-y-2">
            {cityMenuItems.map(({ title, slugPrefix, cities }) => (
              <div key={title}>
                <button
                  onClick={() => toggleSubMenu(title)}
                  className="w-full flex justify-between items-center font-semibold text-gray-700 hover:text-[#ff8b94]"
                >
                  {title}
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openSubMenu === title ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openSubMenu === title && (
                  <ul className="mt-2 pl-4 space-y-1">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/${slugPrefix}-${city.slug}`}
                          className="block text-sm text-gray-600 hover:text-[#ff8b94]"
                          onClick={() => {
                            setIsOpen(false);
                            setOpenSubMenu(null);
                          }}
                        >
                          {city.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Static links */}
            <Link
              href="/about"
              className="block font-semibold text-gray-700 hover:text-[#ff8b94] mt-4"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block font-semibold text-gray-700 hover:text-[#ff8b94] mt-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
