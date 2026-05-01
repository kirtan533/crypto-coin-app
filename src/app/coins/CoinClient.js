"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchCoins } from "@/libs/searchCoins";
import { fetchCoins } from "@/libs/fetchCoins";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { IoSearchOutline } from "react-icons/io5";
import CardSkeleton from "@/ui/CardSkeleton";
import CoinCard from "@/ui/CoinCard";

export default function CoinsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromURL = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const currency = searchParams.get("currency") || "inr";

  const [search, setSearch] = useState(searchFromURL);
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearch(searchFromURL);
  }, [searchFromURL]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(132).fill(1);

  const isSearching = debounceSearch.length > 0;

  const {
    data: coins,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: isSearching
      ? ["searchCoins", debounceSearch]
      : ["coins", currency, page, debounceSearch],
    queryFn: isSearching
      ? () => searchCoins(debounceSearch)
      : () => fetchCoins(currency, page),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const updateParams = (update) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(update).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/coins?${params.toString()}`);
  };

  useEffect(() => {
    if (debounceSearch !== searchFromURL) {
      updateParams({ search: debounceSearch, page: 1 });
    }
  }, [debounceSearch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 mb-10">
      {/* Top Section */}
      <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Currency Filters */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="inr"
              checked={currency === "inr"}
              onChange={() => {
                updateParams({ currency: "inr" });
              }}
              className="accent-blue-500"
            />
            INR
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="usd"
              checked={currency === "usd"}
              onChange={() => {
                updateParams({ currency: "usd" });
              }}
              className="accent-blue-500"
            />
            USD
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="eur"
              checked={currency === "eur"}
              onChange={() => {
                updateParams({ currency: "eur" });
              }}
              className="accent-blue-500"
            />
            EUR
          </label>
        </div>
        {/* Search Input */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-md">
            <input
              type="text"
              placeholder="Search Coin..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 
                     text-sm sm:text-base
                     rounded-lg sm:rounded-xl
                      border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     placeholder-gray-400 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ">
              <IoSearchOutline size={22} />
            </span>
          </div>
        </div>
      </div>
      {/* Coins Grid */}
      <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {/*  Loading State */}
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
        ) : error ? (
          //  ERROR STATE (429 HANDLED)
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-4xl">⚠️</p>
            <p className="text-xl font-semibold text-red-500">
              {error?.message?.includes("429")
                ? "Too many requests (Rate limit reached)"
                : "Something went wrong"}
            </p>
            <p className="text-sm text-gray-400 max-w-md">
              {error?.message?.includes("429")
                ? "You are making requests too fast. Please wait a few seconds and try again."
                : "Unable to fetch data. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
              Retry
            </button>
          </div>
        ) : coins?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-4xl">🔍</p>
            <p className="text-xl font-semibold text-gray-500">
              No coins found for "{debounceSearch}"
            </p>
            <p className="text-sm text-gray-400">
              Try searching something else
            </p>
          </div>
        ) : (
          coins?.map((i) => (
            <div key={i.id} className="w-full max-w-[250px]">
              <CoinCard
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image || i.thumb}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
                page={page}
              />
            </div>
          ))
        )}
      </div>
      {isFetching && !isLoading && !error && (
        <p className="text-center text-yellow-400 mt-2">Updating data...</p>
      )}
      {/* Pagination */}
      <div className="overflow-x-auto py-6">
        <div className="flex gap-2 w-max mx-auto">
          {btns.map((item, index) => (
            <button
              key={index}
              disabled={isFetching}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base transition-all ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              onClick={() => updateParams({ page: index + 1 })}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
