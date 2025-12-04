"use client";

import Image from "next/image";

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
      title: "Hugs and Kisses",
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
      title: "Seer",
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
      title: "Memonto Vita",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/mementoVita.webp",
      year: "2024",
    },
    {
      id: 7,
      title: "Stack”  30”x11”x10” dolomite ",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/Stack”  30”x11”x10” dolomite .webp",
      year: "2024",
    },
    {
      id: 8,
      title: "Mother and Child ",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/MotherandChild.webp",
      year: "2024",
    },
    {
      id: 9,
      title: "Mother and Child ",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4285.webp",
      year: "2024",
    },
    {
      id: 10,
      title: "Mother and Child ",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4309.webp",
      year: "2024",
    },
    {
      id: 11,
      title: "3.5 diametersphere SpanishAlabaster",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/3.5_diametersphere_SpanishAlabaster.webp",
      year: "2024",
    },
    {
      id: 12,
      title: "ApieceofMoonlight41x12x9selenite",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/ApieceofMoonlight41x12x9selenite.webp",
      year: "2024",
    },
    {
      id: 13,
      title: "ApieceofMoonlightpic2",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/ApieceofMoonlightpic2.webp",
      year: "2024",
    },
    {
      id: 14,
      title: "Goddess_26_x18_x12_Dolomite",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/Goddess_26_x18_x12_Dolomite.webp",
      year: "2024",
    },
    {
      id: 15,
      title: "goddess_Dolomite",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/goddess_Dolomite.webp",
      year: "2024",
    },
    {
      id: 16,
      title: "goddess",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/goddess.webp",
      year: "2024",
    },
    {
      id: 17,
      title: "IMG_4285",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4285.webp",
      year: "2024",
    },
    {
      id: 18,
      title: "IMG_4309",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4309.webp",
      year: "2024",
    },
    {
      id: 18,
      title: "IMG_4764",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4764.webp",
      year: "2024",
    },
    {
      id: 19,
      title: "IMG_4765",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4765.webp",
      year: "2024",
    },
    {
      id: 20,
      title: "IMG_4767",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4767.webp",
      year: "2024",
    },
    {
      id: 21,
      title: "IMG_4771",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/IMG_4771.webp",
      year: "2024",
    },
    {
      id: 22,
      title: "memento_vita",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/memento_vita.webp",
      year: "2024",
    },
    {
      id: 23,
      title: "MementoVita90_x23_x20_Limestone",
      artist: "David Stuchicacho",
      category: "Sculpture",
      image: "/MementoVita90_x23_x20_Limestone.webp",
      year: "2024",
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Banner />
      <section className="pt-16 pb-16 bg-white  ">
        <div className="container mx-auto px-[5%] md:px-[10%]">
          <h1 className="text-4xl md:text-5xl  mb-8 text-center">
            About Our Gallery
          </h1>
          <p className="text-center text-xl  ">
            Each piece in the my gallery holds a unique message and style to be
            considered by the viewer, offering a historical reference to the
            diversity of art within the present time.This is truly a growing
            tribute to the talent and creativity we find in our mids
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  my-20">
            {sculptures.map((sculpture, index) => (
              <div key={sculpture.id} className="group cursor-pointer">
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
                <h3 className="text-2xl  mb-2">{sculpture.title}</h3>
                <p className="text-gray-600">{sculpture.artist}</p>
                <p className="text-gray-500">
                  {sculpture.category}, {sculpture.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
