import Navbar from "@/layout/Navbar";
import "./globals.css";
import QueryProvider from "@/ui/QueryProvider";
import { Bebas_Neue } from "next/font/google";
import Footer from "@/layout/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto coin",
  description: "explore all crypto coin available",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
