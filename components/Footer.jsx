import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];
  return (
    <footer className="bg-gray-100 text-black pt-16 pb-8 ">
      <div className="container mx-auto px-[5%] md:px-[10%]">
        {/* Newsletter Section */}

        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4 ">
             <Image src={"/logo.png"} width={150} height={75} alt="Logo" sizes="150px"/>
            </div>
            <p className="text-black/70 text-sm mb-4">
              Artisan Museum celebrates the intersection of tradition and
              innovation in contemporary art.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-black hover:text-museum-gold transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-black hover:text-museum-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-black hover:text-museum-gold transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-black hover:text-museum-gold transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-black/70">
              {navLinks?.map((el, i) => (
                <li key={i}>
                  <Link
                    href={el.href}
                    className="hover:text-museum-gold transition-colors"
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Visit</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Current Exhibitions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Virtual Tours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Events & Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Museum Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Membership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Corporate Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Volunteer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-museum-gold transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/50">
            © 2025 David Arts. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-black/50">
            <Link href={"https://designtechjoy.com"} target="__blank" className="hover:underline underline-offset-8"> Designed by Design Tech Joy </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
