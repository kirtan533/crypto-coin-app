"use client";

import { auth } from "@/firebase/config";
import { fetchCoinDetails } from "@/libs/fetchCoinDetails";
import CoinDetailsSkeleton from "@/ui/CoinDetailsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CoinDetailsClient({ id, currency }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const {
    data: coins,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["coinDetails", id],
    queryFn: () => fetchCoinDetails(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/coins/${id}?${params.toString()}`);
  };

  if (isLoading) {
    return <CoinDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-4xl">⚠️</p>

        <p className="text-xl font-semibold text-red-400">
          Failed to load coin details
        </p>

        {error?.message?.includes("429") && (
          <p className="text-sm text-gray-400">
            Too many requests. Please wait a bit...
          </p>
        )}

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!coins) {
    return <p className="text-center text-gray-400">No data found</p>;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 mt-5">
      <Link href={`/coins?${searchParams.toString()}`}>⬅️Back To Coins</Link>
      <div className="p-8">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="inr"
              checked={currency === "inr"}
              onChange={() => updateParams("currency", "inr")}
              className="accent-blue-500"
            />
            INR
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="usd"
              checked={currency === "usd"}
              onChange={() => updateParams("currency", "usd")}
              className="accent-blue-500"
            />
            USD
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="eur"
              checked={currency === "eur"}
              onChange={() => updateParams("currency", "eur")}
              className="accent-blue-500"
            />
            EUR
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 p-16">
        {isFetching && <p className="text-center text-gray-400">Updating...</p>}
        <p className="text-sm self-center opacity-70 font-semibold">
          Last Updates On {Date(coins?.market_data?.last_updated).split("G")[0]}
        </p>
        {coins?.image?.large && (
          <Image src={coins.image.large} width={64} height={64} alt="coin" />
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-700">{coins?.name}</p>
          <p className="text-2xl font-bold">
            {currencySymbol}
            {coins?.market_data?.current_price?.[currency]}
          </p>
          <p
            className={`text-sm items-center gap-1 ${coins?.market_data?.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {coins?.market_data?.price_change_percentage_24h > 0 ? "▲" : "▼"}
            {coins?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <span className="bg-black text-white text-2xl px-3 py-1 rounded">
          #{coins?.market_cap_rank}
        </span>
        <CustomBar
          high={`${currencySymbol}${coins?.market_data?.high_24h?.[currency]}`}
          low={`${currencySymbol}${coins?.market_data?.low_24h?.[currency]}`}
        />

        <div className="w-full p-4">
          <Item title={"Max Supply"} value={coins?.market_data?.max_supply} />
          <Item
            title={"Circulating Supply"}
            value={coins?.market_data?.circulating_supply?.toFixed(2)}
          />
          <Item
            title={"Market Cap"}
            value={`${currencySymbol}${coins?.market_data?.market_cap?.[currency]}`}
          />
          <Item
            title={"All Time Low"}
            value={`${currencySymbol}${coins?.market_data?.atl?.[currency]}`}
          />
          <Item
            title={"All Time High"}
            value={`${currencySymbol}${coins?.market_data?.ath?.[currency]}`}
          />
        </div>
      </div>
    </div>
  );
}

const Item = ({ title, value }) => (
  <div className="flex justify-between w-full my-4">
    <p className="font-['Bebas_Neue'] tracking-widest font-medium">{title}</p>
    <p className="font-normal">{value}</p>
  </div>
);

const CustomBar = ({ high, low }) => (
  <div className="flex flex-col items-center w-full gap-2">
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-teal-500 h-2 rounded-full"
        style={{ width: "50%" }}
      ></div>
    </div>
    <div className="flex justify-between w-full">
      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
        {low}
      </span>
      <p className="text-sm">24H Range</p>
      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
        {high}
      </span>
    </div>
  </div>
);
