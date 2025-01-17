import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.sass";
import Header from "@/components/Header";
import { PropsWithChildren } from "react";

const signikaNegative = localFont({
  src: "../../public/fonts/SignikaNegative-VariableFont_wght.ttf",
  variable: "--font-signika-negative",
});

export const metadata: Metadata = {
  title: "Kakajan Dörtguly",
  description:
    "Crafting modern web and mobile solutions to elevate your business goals, from concept to launch.",
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${signikaNegative.variable} antialiased`}>
        <Header />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
