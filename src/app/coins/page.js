"use client";

import { fetchCoins } from "@/libs/fetchCoins";
import CoinCard from "@/ui/CoinCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CoinsPage() {
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
  };

  const btns = new Array(132).fill(1);

  const {
    data: coins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coins", currency, page],
    queryFn: () => fetchCoins(currency, page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-400">Error While Fetching Coins</p>;

  return (
    <div className="container mx-auto max-w-7xl px-4 mb-10">
      <div className="p-8">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="inr"
              checked={currency === "inr"}
              onChange={() => setCurrency("inr")}
              className="accent-blue-500"
            />
            INR
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="usd"
              checked={currency === "usd"}
              onChange={() => setCurrency("usd")}
              className="accent-blue-500"
            />
            USD
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="eur"
              checked={currency === "eur"}
              onChange={() => setCurrency("eur")}
              className="accent-blue-500"
            />
            EUR
          </label>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {coins?.map((i) => (
          <CoinCard
            id={i.id}
            key={i.id}
            name={i.name}
            price={i.current_price}
            img={i.image}
            symbol={i.symbol}
            currencySymbol={currencySymbol}
          />
        ))}
      </div>
      <div className="overflow-x-auto p-8">
        <div className="flex gap-2 w-max">
          {btns.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded transition-all ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
