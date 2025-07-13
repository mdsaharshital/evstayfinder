// app/[slug]/page.tsx
import { allCities, allHotels } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CityPage({ params }) {
  const city = allCities.find((c) => c.slug === params.slug);
  if (!city) return notFound();

  const hotels = allHotels.filter((h) => h.citySlug === city.slug);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{city.title}</h1>
      <div className="pt-6 prose">{city.bodyText}</div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.slug}
            className="border rounded-xl shadow overflow-hidden"
          >
            <Image
              src={hotel.image.src}
              width={hotel.image.width}
              height={hotel.image.height}
              alt={hotel.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{hotel.title}</h2>
              <Link
                href={hotel.affiliateLink}
                target="_blank"
                className="text-blue-600 mt-2 inline-block"
              >
                View Hotel →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
