import ProtectedRoutes from "@/ui/component/ProtectedRoutes";

const Footer = () => {
  return (
    <ProtectedRoutes>
      <footer className="w-full py-4 bg-gray-900 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CoinApp. All rights reserved. Explore
        Crypto coin at Xcrypto
      </footer>
    </ProtectedRoutes>
  );
};

export default Footer;
