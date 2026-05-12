import { fetchCoins } from "@/libs/fetchCoins";
import CoinsClient from "./CoinClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function CoinsPage({ searchParams }) {
  const queryClient = new QueryClient();

  const params = await searchParams;

  const page = params.page ? Number(params.page) : 1;

  const validCurrencies = ["inr", "usd", "eur"];
  const currency = validCurrencies.includes(params.currency)
    ? params.currency
    : "inr";

  //prefetch🔥
  await queryClient.prefetchQuery({
    queryKey: ["coins", currency, page],
    queryFn: () => fetchCoins(currency, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinsClient />
    </HydrationBoundary>
  );
}
