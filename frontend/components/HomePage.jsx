

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import HomepageGallery from "./HomepageGallery";
import { getslider } from "@/hooks/data";

export const dynamic= "force-static"

export default async function HomePage() {
  const sliderres= await getslider("home")
  const sliderresprops = sliderres && sliderres?.success==true ? sliderres?.data : []
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero slider={sliderresprops} />

      
      <HomepageGallery />
      {/* About Section */}
      <section id="about" className="py-32  bg-gray-100">
        <div className="container mx-auto px-[5%] md:px-[10%] ">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square">
              <Image
                src="/MotherandChild15x5x3.5Soapstone.webp"
                alt="Studio"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-museum-gold opacity-35" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl  mb-8">
                Our Artistic Vision
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                For over two decades, David Sculptures has been at the forefront
                of contemporary sculptural art, representing extraordinary
                talent and visionary creativity.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                We believe in the transformative power of three-dimensional art
                to evoke emotion, challenge perception, and create meaningful
                dialogue between the artwork and its audience.
              </p>
              <p className="text-lg mb-10 leading-relaxed">
                Each piece in our collection represents countless hours of
                dedication, technical mastery, and artistic innovation.
              </p>
              <Link
                href="/about"
                className="inline-block bg-black text-white px-10 py-4 text-lg font-semibold hover:bg-amber-500 hover:text-black transition-colors duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
