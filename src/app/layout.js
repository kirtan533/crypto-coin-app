import Navbar from "@/layout/Navbar";
import "./globals.css";
import QueryProvider from "@/ui/QueryProvider";
import Footer from "@/layout/Footer";

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
