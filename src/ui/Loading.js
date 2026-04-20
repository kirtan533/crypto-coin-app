export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="w-[300px] h-[300px] border-b-4 border-dotted border-[rgb(65,65,65)] rounded-full animate-spin"></div>

      <p className="mt-6 text-4xl font-normal tracking-[5px] font-sans">
        Loading...
      </p>
    </div>
  );
}
