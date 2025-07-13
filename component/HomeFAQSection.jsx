import React from "react";

const HomeFAQSection = () => {
  return (
    <section className="mt-16 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">
        FAQs About EV Hotel Stays
      </h2>
      <details className="border cursor-pointer p-4 rounded">
        <summary className="font-semibold">
          What does EV-friendly hotel mean?
        </summary>
        <p className="mt-2 text-gray-600">
          An EV-friendly hotel offers electric vehicle charging facilities
          either in-room or in the parking area, ensuring you have the
          convenience of charging your EV while you rest.
        </p>
      </details>
      <details className="border cursor-pointer p-4 rounded">
        <summary className="font-semibold">
          Can I find Tesla chargers in these hotels?
        </summary>
        <p className="mt-2 text-gray-600">
          Many of the hotels listed support Tesla and other EV models via
          Superchargers or universal plugs, allowing easy charging options for
          all EV users.
        </p>
      </details>
      <details className="border cursor-pointer p-4 rounded">
        <summary className="font-semibold">
          Are there any additional fees for using the charging facilities?
        </summary>
        <p className="mt-2 text-gray-600">
          Most hotels offer EV charging for free, but some may charge a small
          fee for using the charging station. It's always best to check the
          hotel's amenities or contact them directly for detailed information.
        </p>
      </details>
      <details className="border cursor-pointer p-4 rounded">
        <summary className="font-semibold">
          How do I book a hotel with an EV charger?
        </summary>
        <p className="mt-2 text-gray-600">
          Simply browse our curated list of EV-friendly hotels, select your
          destination, and book a room with the EV charging option included. You
          can easily filter by location and available amenities.
        </p>
      </details>
    </section>
  );
};

export default HomeFAQSection;
