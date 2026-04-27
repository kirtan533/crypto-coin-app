"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CoinImg from "../../public/btc.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="bg-black w-full h-[100vh] flex justify-center items-center flex-col">
      <motion.div
        animate={{ translateY: "20px" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          width={600}
          height={600}
          loading="eager"
          className="object-contain"
          src={CoinImg}
          alt="coin image"
        />
      </motion.div>
      <p className="text-6xl text-center font-light text-white -mt-10">
        Xcrypto
      </p>
    </div>
  );
}
