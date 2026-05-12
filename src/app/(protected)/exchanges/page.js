"use client";

import { auth } from "@/firebase/config";
import { fetchExchanges } from "@/libs/fetchExchanges";
import CardSkeleton from "@/ui/CardSkeleton";
import ExchangeCard from "@/ui/ExchangeCard";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ExchangePage() {
  const router = useRouter();

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchanges,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    retry: 2,

    //smart retry delay - (for 429 error)
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 mt-6">
        <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-4xl">⚠️</p>
        <p className="text-xl font-semibold text-red-400">
          Failed to load exchanges
        </p>
        {error?.message?.toLowerCase().includes("too many") && (
          <p className="text-sm text-gray-400">
            Too many requests. Please wait a few seconds...
          </p>
        )}
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">No exchanges found</div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 mt-6">
      <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {data.map((i) => (
          <ExchangeCard
            key={i.id}
            name={i.name}
            img={i.image}
            rank={i.trust_score_rank}
            url={i.url}
          />
        ))}
      </div>
      {isFetching && (
        <p className="text-center text-gray-400 mt-4">Updating...</p>
      )}
    </div>
  );
}
