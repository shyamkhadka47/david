"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import HomepageGallery from "./HomepageGallery";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Gallery Section */}
      {/* <section id="gallery" className="py-32 px-[5%] md:px-[10%] bg-white">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl  mb-4 text-center">
              Featured Sculptures
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">
              Each piece is a unique expression of artistic vision, meticulously
              crafted to evoke emotion and contemplation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sculptures.map((sculpture, index) => (
              <div
                key={sculpture.id}
                className="group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <Link href={`/sculpture/${sculpture.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={`/banner.webp`}
                      alt={sculpture.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {sculpture.featured && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs px-3 py-1">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white border border-white px-6 py-2 hover:bg-white/20 transition-colors duration-300">
                        View Details
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl  mb-2">
                    {sculpture.title}
                  </h3>
                  <p className="text-gray-600">
                    {sculpture.material}, {sculpture.year}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center" data-aos="fade-up">
            <Link
              href="/gallery"
              className="inline-block border-2 border-black text-black px-10 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section> */}
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
