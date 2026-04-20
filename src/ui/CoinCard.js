import Image from "next/image";
import Link from "next/link";

export default function CoinCard({
  name,
  img,
  symbol,
  price,
  id,
  currencySymbol = "₹",
}) {
  return (
    <Link href={`/coins/${id}`}>
      <div className="w-52 shadow-md p-8  rounded-xl transition-all duration-300  m-4 hover:scale-110 flex flex-col items-center gap-2 overflow-hidden">
        <Image
          src={img || "/no-image.png"}
          width={50}
          height={50}
          className="object-contain"
          alt="coin image"
        />
        <h2 className="text-xl font-bold truncate w-full text-center">
          {symbol}
        </h2>
        <p className="truncate w-full text-center">{name}</p>
        <p className="truncate w-full text-center">
          {price ? `${currencySymbol}${price}` : "NA"}
        </p>
      </div>
    </Link>
  );
}
