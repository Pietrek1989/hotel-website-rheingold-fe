import React, { useState } from "react";
import { Offer } from "../../types and interfaces";
import { isDateInSeason } from "./helperFunctions/offerHelpers";
import OfferCard from "./OfferCard";

interface OffersProps {
  availableOffers: Offer[];
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}

const Offers: React.FC<OffersProps> = ({ availableOffers, selectedRange }) => {
  const { start, end } = selectedRange ?? {};
  const offerCards = availableOffers.map((offer, index) => {
    let price = 0;
    if (start && end) {
      const numDays = (end.getTime() - start.getTime()) / 86400000; // 1 day = 86400000 ms
      price = isDateInSeason(start)
        ? offer.priceSeason * numDays
        : offer.priceOffSeason * numDays;
    }
    return (
      <OfferCard
        key={offer._id}
        offer={offer}
        price={price}
        selectedRange={selectedRange}
        index={index}
      />
    );
  });

  return (
    <>
      <h2 className="font-bold text-2xl  text-center mt-5 bg-white py-2">
        Available Offers:
      </h2>

      <div className="flex flex-col rounded-lg">{offerCards}</div>
    </>
  );
};

export default Offers;
