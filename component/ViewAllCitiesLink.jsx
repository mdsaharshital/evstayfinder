// components/ViewAllCitiesLink.jsx
import Link from "next/link";

export default function ViewAllCitiesLink() {
  return (
    <div className="text-center mt-10">
      <Link
        href="/all-cities"
        className="inline-block text-[#ff8b94] font-medium text-lg underline hover:text-[#ff8b94]/80"
      >
        🌍 View All Cities with EV-Friendly Hotels →
      </Link>
    </div>
  );
}
