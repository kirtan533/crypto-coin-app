export default function CardSkeleton() {
  return (
    <div className="w-full max-w-[250px] bg-gray-900 border border-gray-700 rounded-xl p-4 animate-pulse mb-7">
      {/* IMAGE */}
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 mb-4"></div>

      {/* NAME */}
      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>

      {/* RANK */}
      <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
    </div>
  );
}
