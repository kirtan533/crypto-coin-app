import Image from "next/image";
import Link from "next/link";

export default function ExchangeCard({ name, img, rank, url }) {
  return (
    <Link href={url} target={"_blank"}>
      <div className="w-52 shadow-md p-8  rounded-xl transition-all duration-300  m-4 hover:scale-110 flex flex-col items-center gap-2 overflow-hidden">
        <Image
          src={img || "/no-image.png"}
          width={100}
          height={100}
          alt="exchange image"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-xl font-bold truncate w-full text-center">
          {rank}
        </h1>
        <p className="truncate w-full text-center">{name}</p>
      </div>
    </Link>
  );
}
