"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Exchanges", href: "/exchanges" },
  { name: "Coins", href: "/coins" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="p-4 bg-black">
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${pathname === link.href ? "text-red-300" : "text-white"}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
