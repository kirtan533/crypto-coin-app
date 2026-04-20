"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Exchanges", href: "/exchanges" },
  { name: "Coins", href: "/coins" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    checkUser();
    window.addEventListener("userChanged", checkUser);
    return () => window.removeEventListener("userChanged", checkUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Links */}
        <div className="flex gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-md sm:text-base transition ${
                pathname === link.href
                  ? "text-blue-400"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Auth Button */}
        <div>
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-1.5 sm:px-5 sm:py-2 text-md sm:text-base 
                     bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button
                className="px-4 py-1.5 sm:px-5 sm:py-2 text-md sm:text-base 
                       bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
