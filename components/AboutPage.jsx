"use client";

import Image from "next/image";
import Banner from "./Banner";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Banner />
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <h1
            className="text-4xl md:text-5xl font-serif mb-8 text-center"
            data-aos="fade-up"
          >
            About Us
          </h1>

          <div className="grid md:grid-cols-2 gap-16 items-center px-[5%] md:px-[10%]">
            <div className="relative aspect-square" data-aos="fade-right">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Studio"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-500" />
            </div>

            <div data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
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
              <p className="text-lg mb-6 leading-relaxed">
                Each piece in our collection represents countless hours of
                dedication, technical mastery, and artistic innovation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
