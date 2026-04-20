"use client";

import { fetchExchanges } from "@/libs/fetchExchanges";
import ExchangeCard from "@/ui/ExchangeCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ExchangePage() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchanges,
    keepPreviousData: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

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
