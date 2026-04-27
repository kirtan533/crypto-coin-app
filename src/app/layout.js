import Navbar from "@/layout/Navbar";
import "./globals.css";
import QueryProvider from "@/ui/QueryProvider";
import Footer from "@/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Crypto coin",
  description: "explore all crypto coin available",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
