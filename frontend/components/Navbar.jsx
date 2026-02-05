"use client";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ logo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
  ];
  const mobnavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <div className="fixed  top-0 left-0 right-0 z-50 bg-white  border-b border-border">
      <nav className="container mx-auto px-[5%] md:px-[10%]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="h-[50px]">
            <Link href="/">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${logo}`}
                alt="Logo of David"
                width={150}
                height={75}
                sizes="150px"
                className="w-full h-full object-cover"
              />
              {/* <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
              <span className=" text-2xl font-bold">D</span>
            </div> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-accent transition-colors tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons (using plain Tailwind CSS for buttons) */}
          <Link
            href={"/contact"}
            className="hidden md:flex items-center space-x-4 bg-black/80 px-3 py-2 rounded-md shadow-2xl text-white"
          >
            Contact us
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/20 rounded-full transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu
                aria-label="Open Mobile Menu"
                className="h-6 w-6 text-foreground"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in-up">
            {mobnavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3 text-sm font-medium text-foreground hover:text-accent transition-colors tracking-wide uppercase"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
