"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Mobile Menu */}
      <div
        className={`fixed overflow-hidden inset-0 md:hidden bg-black z-[99] flex flex-col justify-between items-center transition-transform duration-300 bg-red ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Logo and Close Button for Mobile */}
        <div className="flex justify-between w-full px-8 pt-8">
          <Link
            href="/"
            className="text-white font-serif text-2xl tracking-wider"
            onClick={() => setIsMenuOpen(false)}
          >
            David<span className="text-amber-500">.</span>
          </Link>

          <button className="text-white" onClick={() => setIsMenuOpen(false)}>
            <X className="h-8 w-8 cursor-pointer" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-8 text-white text-3xl font-serif justify-center flex-grow">
          {["", "gallery", "about", "contact"].map((page) => (
            <Link
              key={page}
              href={`/${page}`}
              className="hover:text-amber-500 transition-colors uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {page === "" ? "Home" : page}
            </Link>
          ))}
        </nav>
      </div>

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[5%] md:px-[10%] ${
          scrollY > 50 ? "bg-black backdrop-blur-md py-8" : "bg-amber-900 py-8"
        } `}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-serif text-2xl tracking-wider"
            onClick={() => setIsMenuOpen(false)}
          >
            David<span className="text-amber-500">.</span>
          </Link>

          {isMenuOpen && (
            <button
              className="absolute top-8 right-8 text-white z-50 pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-8 w-8 cursor-pointer" />
            </button>
          )}

          <div className="flex justify-between items-center">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8  text-white">
              {[
                { name: "home", url: "/" },
                { url: "/gallery", name: "gallery" },
                { url: "/about", name: "about" },
                { url: "/contact", name: "contact" },
              ].map((el, i) => (
                <Link
                  key={i}
                  href={`${el.url}`}
                  className="hover:text-amber-500 transition-colors uppercase tracking-wider text-sm"
                >
                  {el.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden text-white ${
                isMenuOpen ? "hidden" : "block"
              }`}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
