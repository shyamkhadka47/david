"use client";

import Image from "next/image";
import Link from "next/link";
import Banner from "./Banner";

export default function GalleryPage() {
  const sculptures = [
    {
      id: 1,
      title: "Ethereal Flow",
      artist: "Elena Markov",
      material: "Bronze & Marble",
      year: "2023",
    },
    {
      id: 2,
      title: "Temporal Shift",
      artist: "Marcus Chen",
      material: "Steel & Glass",
      year: "2022",
    },
    {
      id: 3,
      title: "Harmonic Resonance",
      artist: "Sophia Reyes",
      material: "Alabaster",
      year: "2023",
    },
    {
      id: 4,
      title: "Celestial Form",
      artist: "Elena Markov",
      material: "Bronze",
      year: "2021",
    },
    {
      id: 5,
      title: "Whispered Silence",
      artist: "Marcus Chen",
      material: "Marble & Gold Leaf",
      year: "2023",
    },
    {
      id: 6,
      title: "Fractured Reality",
      artist: "Sophia Reyes",
      material: "Mixed Media",
      year: "2022",
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Banner />
      <section className="pt-32 pb-16 bg-white  px-[5%] md:px-[10%]">
        <div className="container mx-auto px-4">
          <h1
            className="text-4xl md:text-5xl font-serif mb-8 text-center"
            data-aos="fade-up"
          >
            Our Collection
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  px-[5%] md:px-[10%]">
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
                      src={`/placeholder.svg?height=900&width=600`}
                      alt={sculpture.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
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
                  <p className="text-gray-600">{sculpture.artist}</p>
                  <p className="text-gray-500">
                    {sculpture.material}, {sculpture.year}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
