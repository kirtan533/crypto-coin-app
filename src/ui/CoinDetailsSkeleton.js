const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export default function CoinDetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl px-4 mt-5">
      {/* Back button */}
      <Skeleton className="w-40 h-5 mb-6" />

      {/* Currency selector */}
      <div className="flex gap-4 p-8">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-16 h-5" />
      </div>

      <div className="flex flex-col items-start gap-4 p-16 w-full">
        {/* Last updated */}
        <Skeleton className="w-56 h-4 self-center" />

        {/* Coin Image */}
        <Skeleton className="w-16 h-16 rounded-full" />

        {/* Name + Price + Change */}
        <div className="flex flex-col gap-2 w-40">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-20 h-4" />
        </div>

        {/* Rank */}
        <Skeleton className="w-16 h-8 rounded" />

        {/* Custom Bar */}
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="w-full h-2 rounded-full" />
          <div className="flex justify-between w-full">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>

        {/* Stats list */}
        <div className="w-full p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between w-full my-4">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
