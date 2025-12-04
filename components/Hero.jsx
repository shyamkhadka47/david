import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image + Overlay */}
      <div className="absolute min-h-screen inset-0">
        <div className="w-full h-full inset-0 ">
          <Image
            src="/The Universe 11”x11”x6”  Carrara marble.webp"
            alt="Museum Interior"
            fill
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-museum-dark/80 via-museum-dark/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-[5%] md:px-[10%] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in-up">
            <h1 className=" text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Universal
              <br />
              Expressions
            </h1>

            <p className="text-lg mb-8 text-white/90 max-w-md font-light">
              Explore the intersection of traditional techniques and modern
              innovation in our latest curated collection.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={"/gallery"}
                className="bg-museum-gold hover:bg-museum-gold/90 text-museum-dark font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-colors"
              >
                View Gallery
              </Link>

              <Link
                href={"/contact"}
                className="border border-white text-white hover:bg-white hover:text-museum-dark font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Info Card */}
          <div className="lg:ml-auto ">
            <div className="bg-background/95 backdrop-blur-sm p-8 max-w-md shadow-2xl rounded-lg">
              <div className="space-y-6">
                {/* Opening Hours */}
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-5 w-5 text-museum-gold mt-1" />
                  <div>
                    <h3 className=" text-xl font-semibold mb-2">
                      Opening Hours
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Tuesday – Thursday: 09:00 – 19:00</p>
                      <p>Friday – Monday: 09:00 – 17:00</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  {/* Location */}
                  <Link
                    href={
                      "https://www.google.com/maps/@35.6581023,-105.9945327,45m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D"
                    }
                    className="flex items-start gap-3 mb-4"
                  >
                    <MapPin className="h-5 w-5 text-museum-gold mt-1" />
                    <div>
                      <h3 className=" text-xl font-semibold mb-2">Find Us</h3>
                      <p className="text-sm text-muted-foreground hover:text-museum-gold">
                        29 25 Rufina Court Unit F
                        <br />
                        Santa Fe, NM, 87507
                      </p>
                    </div>
                  </Link>

                  {/* Contact */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-museum-gold mt-1" />
                    <div>
                      <a
                        href="tel:5052308664"
                        className="hover:text-museum-gold transition-colors flex items-start gap-2"
                      >
                        <span>{`(505) 230 8664`}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Plan Visit Button */}
                <button className="w-full bg-museum-dark hover:bg-museum-brown text-white font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-colors">
                  Plan Your Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
