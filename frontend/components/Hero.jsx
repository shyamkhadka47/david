"use client";
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Hero = ({ slider }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slider?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slider]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slider?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slider?.length) % slider?.length);
  };
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* SLIDER BACKGROUND */}
      <div className="absolute inset-0">
        {slider?.length > 0 &&
          slider.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${slide.sliderImage}`}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>
          ))}
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-[5%] md:px-[10%] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT – SLIDE CONTENT */}
          <div className="text-white animate-fade-in-up">
            {slider?.[currentSlide] && (
              <>
                {/* BREADCRUMB */}
              {pathname !== "/" && <nav className="text-sm md:text-base mb-2">
                  <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center text-2xl">
                      <Link href="/" className="hover:underline">
                        Home
                      </Link>
                      <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center text-2xl">
                      <span className="text-amber-500 capitalize">
                        {pathname.replace("/", "")}
                      </span>
                    </li>
                  </ol>
                </nav>}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight capitalize">
                  {slider[currentSlide].title}
                </h1>

                <p className="text-lg mb-8 text-white/90 max-w-xl">
                  {slider[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={"/contact"}
                    className="bg-museum-gold text-museum-dark font-medium uppercase py-3 px-8 rounded-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* RIGHT – STATIC INFO CARD */}
          <div className="lg:ml-auto">
            <div className="bg-background/95 backdrop-blur-sm p-8 max-w-md shadow-2xl rounded-lg">
              <div className="space-y-6">
                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-museum-gold mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Opening Hours
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tuesday – Thursday: 09:00 – 19:00
                      <br />
                      Friday – Monday: 09:00 – 17:00
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <Link
                    href="https://www.google.com/maps"
                    className="flex items-start gap-3"
                  >
                    <MapPin className="h-5 w-5 text-museum-gold mt-1" />
                    <p className="text-sm text-muted-foreground hover:text-museum-gold">
                      29 25 Rufina Court Unit F
                      <br />
                      Santa Fe, NM, 87507
                    </p>
                  </Link>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-museum-gold mt-1" />
                    <a href="tel:5052308664" className="hover:text-museum-gold">
                      (505) 230 8664
                    </a>
                  </div>
                </div>

                <button className="w-full bg-museum-dark hover:bg-museum-brown text-white font-medium uppercase py-3 rounded-lg">
                  Plan Your Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      {slider?.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 bg-primary rounded-full items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-12 h-12 bg-primary rounded-full items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}
    </section>
  );
};

export default Hero;
