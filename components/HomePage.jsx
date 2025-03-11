"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const sculptures = [
    {
      id: 1,
      title: "Ethereal Flow",
      material: "Bronze & Marble",
      year: "2023",
      featured: true,
    },
    {
      id: 2,
      title: "Temporal Shift",
      material: "Steel & Glass",
      year: "2022",
      featured: false,
    },
    {
      id: 3,
      title: "Harmonic Resonance",
      material: "Alabaster",
      year: "2023",
      featured: true,
    },
    {
      id: 4,
      title: "Celestial Form",
      material: "Bronze",
      year: "2021",
      featured: false,
    },
    {
      id: 5,
      title: "Whispered Silence",
      material: "Marble & Gold Leaf",
      year: "2023",
      featured: true,
    },
    {
      id: 6,
      title: "Fractured Reality",
      material: "Mixed Media",
      year: "2022",
      featured: false,
    },
  ];

  const artists = [
    {
      id: 1,
      name: "Elena Markov",
      specialty: "Contemporary Sculptor",
      bio: "Known for her innovative approach to traditional materials, creating pieces that challenge conventional perceptions of form and space.",
    },
    {
      id: 2,
      name: "Marcus Chen",
      specialty: "Abstract Expressionist",
      bio: "Explores the intersection of emotion and physical form through dynamic sculptures that seem to capture movement in static materials.",
    },
    {
      id: 3,
      name: "Sophia Reyes",
      specialty: "Minimalist Sculptor",
      bio: "Creates elegant, refined works that celebrate the inherent beauty of simple forms and the subtle interplay of light and shadow.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1800&width=1200"
            alt="Featured Sculpture"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
          <div
            className="max-w-2xl text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Timeless Beauty <br />
              in <span className="text-amber-500">Form</span>
            </h1>
            <p className="text-lg text-white/90 mb-10 max-w-md mx-auto">
              Discover extraordinary sculptures that transcend time and space,
              crafted by master Davids.
            </p>
            <Link
              href="#gallery"
              className="inline-block bg-amber-500 text-black px-10 py-4 text-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>

          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link href="#gallery" className="text-white animate-bounce">
              <ChevronDown className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-[5%] md:px-[10%] bg-white">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-center">
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
                  <h3 className="text-2xl font-serif mb-2">
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
      </section>

      {/* About Section */}
      <section id="about" className="py-32  bg-gray-100">
        <div className="container mx-auto px-[5%] md:px-[10%] ">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square" data-aos="fade-right">
              <Image
                src="/banner.webp"
                alt="Studio"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-500" />
            </div>

            <div data-aos="fade-left">
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
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

      {/* Artists Section */}
      <section id="artists" className="py-32 px-[5%] md:px-[10%] bg-white">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-center">
              Featured Artists
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">
              Meet the visionary creators behind our extraordinary collection of
              sculptures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {artists.map((artist, index) => (
              <div
                key={artist.id}
                className="text-center group"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="relative min-w-[220px] h-64 mx-auto mb-8 overflow-hidden">
                  <div className="absolute inset-4 border border-amber-500 z-10" />
                  <div className="absolute inset-0 bg-gray-100 transform group-hover:scale-110 transition-transform duration-700" />
                  <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={artist.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-2">{artist.name}</h3>
                <p className="text-amber-500 font-medium mb-4">
                  {artist.specialty}
                </p>
                <p className="text-gray-600 max-w-md mx-auto">{artist.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
