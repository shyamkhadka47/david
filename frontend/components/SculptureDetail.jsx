"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "./Banner";

export default function SculptureDetail({ params }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Mock data for the sculpture
  const sculpture = {
    id: params?.id,
    title: "Ethereal Flow",
    artist: "Elena Markov",
    year: "2023",
    material: "Bronze & Marble",
    dimensions: "180 x 90 x 70 cm",
    description:
      "Ethereal Flow is a masterpiece that embodies the delicate balance between strength and fluidity. The sculpture's sweeping lines and intricate details capture the essence of movement frozen in time, inviting viewers to explore its many facets from different angles. Elena Markov's expert manipulation of bronze and marble creates a harmonious contrast between the warm, golden tones of the metal and the cool, smooth surface of the stone.",
    price: "$75,000",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Banner />
      <div className="container mx-auto px-[5%] md:px-[10%] py-16">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-amber-500 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <div className="relative aspect-[3/4] mb-8">
              <Image
                src={sculpture.images[0] || "/placeholder.svg"}
                alt={sculpture.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {sculpture.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${sculpture.title} - View ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <h1 className="text-4xl md:text-5xl  mb-4">{sculpture.title}</h1>
            <p className="text-xl text-gray-600 mb-6">by {sculpture.artist}</p>
            <div className="space-y-4 mb-8">
              <p>
                <span className="font-semibold">Year:</span> {sculpture.year}
              </p>
              <p>
                <span className="font-semibold">Material:</span>{" "}
                {sculpture.material}
              </p>
              <p>
                <span className="font-semibold">Dimensions:</span>{" "}
                {sculpture.dimensions}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {sculpture.price}
              </p>
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {sculpture.description}
            </p>
            <a
              href="#"
              className="inline-block bg-amber-500 text-black px-10 py-4 text-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
            >
              Inquire About This Piece
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
