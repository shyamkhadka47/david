import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
   
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-[5%]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center">
              <span className="font-serif text-2xl font-bold">D</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Icons (using plain Tailwind CSS for buttons) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="flex items-center justify-center p-2 hover:bg-accent/20 rounded-full transition-colors focus:outline-none"
            >
              {/* <Search className="h-5 w-5 text-foreground" /> */}
            </button>
            <button
              className="flex items-center justify-center p-2 hover:bg-accent/20 rounded-full transition-colors focus:outline-none"
            >
              {/* <ShoppingBag className="h-5 w-5 text-foreground" /> */}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/20 rounded-full transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-sm font-medium text-foreground hover:text-accent transition-colors tracking-wide uppercase"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
