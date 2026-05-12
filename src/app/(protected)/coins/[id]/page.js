import { fetchCoinDetails } from "@/libs/fetchCoinDetails";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CoinDetailsClient from "./CoinDetailsClient";
import ProtectedRoutes from "@/ui/component/ProtectedRoutes";

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
    <ProtectedRoutes>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CoinDetailsClient id={id} currency={currency} />
      </HydrationBoundary>
    </ProtectedRoutes>
  );
}
