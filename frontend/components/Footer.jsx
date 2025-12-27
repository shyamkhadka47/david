import {
  Facebook,
  Instagram,
  LocateFixedIcon,
  LocateIcon,
  MailIcon,
  MapIcon,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_.7fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className=" mb-4 h-[50px]">
              <Image
                src={"/logo.png"}
                width={150}
                height={75}
                alt="Logo"
                sizes="150px"
                className="w-max h-full object-contain"
              />
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
            <h4 className=" text-lg font-semibold mb-4">Quick Links</h4>
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

          {/* VISIT */}
          <div>
            <h4 className=" text-lg font-semibold mb-4 lg:ml-5">Visit Us</h4>

            <Link
              href={
                "https://www.google.com/maps/@35.6581023,-105.9945327,45m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D"
              }
              target="__blank"
              className="flex items-start justify-start gap-2 hover:text-museum-gold "
            >
              {" "}
              <LocateFixedIcon />{" "}
              <span> 29 25 Rufina Court F Unit Santa Fe, NM, 87507</span>
            </Link>
          </div>

          {/* CONTACT ME */}
          <div>
            <h4 className=" text-lg font-semibold mb-4">Contact Me</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a
                  href="tel:5052308664"
                  className="hover:text-museum-gold transition-colors flex items-start gap-2"
                >
                  <PhoneCall size={20} /> <span>{`(505) 230 8664`}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:something@gmail.com"
                  className="hover:text-museum-gold transition-colors flex items-start gap-2"
                >
                  <MailIcon size={20} /> <span>something@gmail.com</span>
                </a>
              </li>
              <li>
                {" "}
                <Link
                  href={
                    "https://www.google.com/maps/@35.6581023,-105.9945327,45m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D"
                  }
                  target="__blank"
                  className="flex items-start justify-start gap-2 hover:text-museum-gold "
                >
                  {" "}
                  <LocateFixedIcon />{" "}
                  <span> 29 25 Rufina Court Unit F Santa Fe, NM, 87507</span>
                </Link>
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
            <Link
              href={"https://designtechjoy.com"}
              target="__blank"
              className="hover:underline underline-offset-8"
            >
              {" "}
              Designed by Design Tech Joy{" "}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
