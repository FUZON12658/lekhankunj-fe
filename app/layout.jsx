import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { CartProvider } from "@/components/common/cart_sidebar";
import { ReactQueryProvider } from "@/components/common/react_query_provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Lekhankunja",
  description: "Lekhankunja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ReactQueryProvider>
        <CartProvider>
        <Header />
        {children}
        <Footer />
        </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
