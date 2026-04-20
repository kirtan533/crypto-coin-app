"use client";

import useDebounce from "@/hooks/useDebounce";
import { fetchCoins } from "@/libs/fetchCoins";
import { searchCoins } from "@/libs/searchCoins";
import CoinCard from "@/ui/CoinCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function CoinsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
  };

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
      : ["coins", currency, page],
    queryFn: isSearching
      ? () => searchCoins(debounceSearch)
      : () => fetchCoins(currency, page),
    keepPreviousData: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  {
    isLoading && <p>Loading...</p>;
  }
  {
    isFetching && !isLoading && <p>Updating...</p>;
  }
  if (error) return <p className="text-red-400">Error While Fetching Coins</p>;

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

        {/* Search Input */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-md">
            <input
              type="text"
              placeholder="Search Coin..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
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
      <div
        className="grid gap-6 justify-items-center 
              grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
      >
        {coins?.map((i) => (
          <div key={i.id} className="w-full max-w-[250px]">
            <CoinCard
              id={i.id}
              name={i.name}
              price={i.current_price}
              img={i.image || i.thumb}
              symbol={i.symbol}
              currencySymbol={currencySymbol}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="overflow-x-auto py-6">
        <div className="flex gap-2 w-max mx-auto">
          {btns.map((item, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base transition-all ${
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
