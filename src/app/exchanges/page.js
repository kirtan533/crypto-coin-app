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

  const { data, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchanges,
    keepPreviousData: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto max-w-7xl px-4 mt-6">
      {isLoading ? (
        <div
          className="grid gap-6 justify-items-center 
                    grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className="grid gap-6 justify-items-center 
                    grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
        >
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
      )}
    </div>
  );
}
