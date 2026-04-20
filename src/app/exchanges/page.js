"use client";

import { fetchExchanges } from "@/libs/fetchExchanges";
import ExchangeCard from "@/ui/ExchangeCard";
import { useQuery } from "@tanstack/react-query";

export default function ExchangePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchanges,
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto max-w-7xl px-4 mt-6">
      <div className="flex flex-wrap justify-evenly">
        {data?.map((i) => (
          <ExchangeCard
            key={i.id}
            name={i.name}
            img={i.image}
            rank={i.trust_score_rank}
            url={i.url}
          />
        ))}
      </div>
    </div>
  );
}
