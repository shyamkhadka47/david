"use client";

import Image from "next/image";
import Link from "next/link";
import Banner from "./Banner";

export default function GalleryPage() {
  const sculptures = [
    {
      id: 1,
      title: "Geometric Harmony",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG 3172.png",
      year: "2024",
    },
    {
      id: 2,
      title: "Classical Revival",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/Hugs and Kisses.png",
      year: "2023",
    },
    {
      id: 3,
      title: "Minimalist Forms",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_3592.webp",
      year: "2024",
    },
    {
      id: 4,
      title: "Abstract Narratives",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/Seer.webp",
      year: "2024",
    },
    {
      id: 5,
      title: "Elegant Figures",
      artist: "David Stuchicacho",
      category: "Scupture",
      image: "/IMG_3600.webp",
      year: "2023",
    },
    {
      id: 6,
      title: "Ethereal Dreams",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/mementoVita.webp",
      year: "2024",
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Banner />
      <section className="pt-16 pb-16 bg-white  ">
        <div className="container mx-auto px-[5%] md:px-[10%]">
          <h1
            className="text-4xl md:text-5xl font-serif mb-8 text-center"
           
          >
            About Our Gallery
          </h1>
          <p className="text-center text-xl font-serif ">
            Each piece in the my gallery holds a unique message and style to be
            considered by the viewer, offering a historical reference to the
            diversity of art within the present time.This is truly a growing
            tribute to the talent and creativity we find in our mids
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  my-20">
            {sculptures.map((sculpture, index) => (
              <div
                key={sculpture.id}
                className="group cursor-pointer"
               
              >
                <Link href={`/sculpture/${sculpture.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={`${sculpture.image}`}
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
                    {sculpture.category}, {sculpture.year}
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
