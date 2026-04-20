const CardSkeleton = () => {
  return (
    <div className="w-full max-w-[250px] p-4 rounded-xl border border-gray-800 animate-pulse mb-7">
      <div className="w-full h-24 bg-gray-800 rounded mb-4"></div>
      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
    </div>
  );
};

export default CardSkeleton;
