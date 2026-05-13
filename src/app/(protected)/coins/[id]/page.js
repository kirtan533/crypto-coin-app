import { fetchCoinDetails } from "@/libs/fetchCoinDetails";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CoinDetailsClient from "./CoinDetailsClient";

export default async function CoinDetailsPage({ params, searchParams }) {
  const { id } = await params;
  const currency = searchParams.currency || "inr";

  const queryClient = new QueryClient();

  //prefetch
  await queryClient.prefetchQuery({
    queryKey: ["coinDetails", id],
    queryFn: () => fetchCoinDetails(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinDetailsClient id={id} currency={currency} />
    </HydrationBoundary>
  );
}
